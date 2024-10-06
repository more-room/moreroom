package com.moreroom.domain.partyRequest.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.moreroom.domain.deviceToken.dto.FcmMessageDto;
import com.moreroom.domain.deviceToken.service.FcmService;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.member.repository.MemberRepository;
import com.moreroom.domain.partyRequest.entity.MatchingStatus;
import com.moreroom.domain.partyRequest.entity.PartyRequest;
import com.moreroom.domain.partyRequest.exception.PartyRequestNotFoundException;
import com.moreroom.domain.partyRequest.repository.PartyRequestRepository;
import com.moreroom.domain.theme.entity.Theme;
import com.moreroom.domain.theme.exception.ThemeNotFoundException;
import com.moreroom.domain.theme.repository.ThemeRepository;
import com.moreroom.global.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class PartyMatchingService {

  private final MemberRepository memberRepository;
  private final PartyRequestRepository partyRequestRepository;
  private final RedisUtil redisUtil;
  private final ThemeRepository themeRepository;
  private final RestTemplate restTemplate;
  private final FcmService fcmService;

  private final String fastAPI_URL;
  private final PartyRequestUtil partyRequestUtil;

  // FastAPI의 여러 파티 매칭 결과를 가져오는 메서드
  private List<Map<String, Object>> getBatchPartyMatchingResultFromFastAPI() {
    try {
      HttpHeaders headers = new HttpHeaders();
      HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

      // FastAPI에서 매칭 결과 리스트를 받아옴
      ResponseEntity<List> response = restTemplate.exchange(
          fastAPI_URL, HttpMethod.POST, requestEntity, List.class);

      if (response.getStatusCode().is2xxSuccessful()) {
        return response.getBody();
      } else {
        log.error("FastAPI 요청 실패: " +response.getStatusCode());
        return Collections.emptyList();
      }
    } catch (RestClientException e) {
      log.error("FastAPI로부터 응답을 받는 중 오류 발생", e);
      return Collections.emptyList();
    }
  }

  // FastAPI에서 받은 partyMemberIds로 Member 엔티티 리스트를 가져오는 메서드
  private List<Member> getPartyMembersFromIds(List<Long> memberIds) {
    return memberRepository.findAllByMemberIdIn(memberIds);
  }

  @Scheduled(cron = "0 0 18 * * *", zone = "Asia/Seoul")
//  @Scheduled(fixedRate = 3600000, initialDelay = 10000)
  @Transactional
  public void partyMatchingAndRequest() throws JsonProcessingException {
    log.info("스케줄러 동작함");
    List<Map<String, Object>> batchMatchingResults = getBatchPartyMatchingResultFromFastAPI();

    if (batchMatchingResults == null || batchMatchingResults.isEmpty()) {
      log.error("FastAPI로부터 매칭 결과를 받지 못했습니다.");
      return;
    }

    // 각 파티 매칭 결과에 대해 처리
    for (Map<String, Object> matchingResult : batchMatchingResults) {
      Integer themeId = (Integer) matchingResult.get("theme_id");
      List<Integer> partyMemberIds = (List<Integer>) matchingResult.get("party_members");

      if (partyMemberIds == null || partyMemberIds.size() < 3) {
        continue;
      }

      // FastAPI 결과에서 멤버 ID 리스트를 가져와서 Member 엔티티 리스트를 가져옴
      List<Long> memberIdList = partyMemberIds.stream().mapToLong(Long::valueOf).boxed().toList();
      List<Member> partyMembers = getPartyMembersFromIds(memberIdList);

      // 파티 매칭 UUID 생성 및 처리
      String uuid = setUuidToRequest(memberIdList, themeId); // partyRequest의 uuid 필드에 uuid 저장
      setPartyAcceptRecordMap(uuid, memberIdList); // redis에 accept 현황판 저장
      sendPartyNotification(partyMembers, themeId, uuid); //알림 보내기
    }
    log.info("파티 매칭 완료");
  }

  // 2. 각 member의 파티요청의 UUID 필드에 레디스용 UUID 만들어 저장
  @Transactional
  public String setUuidToRequest(List<Long> memberIdList, Integer themeId) {
    String uuid = UUID.randomUUID().toString();
    int updatedCount = partyRequestRepository.updateUuidAndStatusForMembers(uuid, MatchingStatus.MATCHED, themeId, memberIdList);
    log.info("업데이트된 행의 수: {}", updatedCount);
    return uuid;
  }

  // 3. 레디스 맵 만들기
  public void setPartyAcceptRecordMap(String uuid, List<Long> memberIdList)
      throws JsonProcessingException {
    String key = "PARTYMATCH:" + uuid;

    HashMap<Long, String> partyAcceptRecordMap = new HashMap<>();
    for (Long memberId : memberIdList) {
      partyAcceptRecordMap.put(memberId, "TBD"); // key: memberId; value: ACCEPT, REJECT, TBD(미정);
    }
    partyAcceptRecordMap.put(-1L, " "); //key == -1 -> value: master memberId
    partyAcceptRecordMap.put(-2L, "0"); //key == -2 -> value: accept한 멤버 수
    redisUtil.saveLongStringHashMapExpire(key, partyAcceptRecordMap, 3600); //redis에 저장 (1시간 후 expire)
  }

  // 4. 멤버에게 파티 참가 요청 보내기
  public void sendPartyNotification(List<Member> partyMemberList, Integer themeId, String uuid) {
    Theme theme = themeRepository.findThemeAndCafeById(themeId).orElseThrow(ThemeNotFoundException::new);
    String cafeName = theme.getCafe().getCafeName(); //fetch join 써서 쿼리 추가 실행X

    List<Long> memberIds = partyMemberList.stream().map(Member::getMemberId).toList();
    List<PartyRequest> partyRequests = partyRequestRepository.findByThemeIdAndMemberIdIn(themeId, memberIds);

    for (Member member : partyMemberList) {
      try {
        //partyRequest 찾기
        PartyRequest partyRequest = partyRequests.stream()
                .filter(pr -> pr.getMember().getMemberId().equals(member.getMemberId()))
                .findFirst()
                .orElseThrow(PartyRequestNotFoundException::new);
        //알림보내기
        FcmMessageDto fcmMessageDto = fcmService.makePartyRequestMessage(
                member, theme.getTitle(), cafeName, partyRequest.getPartyRequestId(), uuid, themeId);
        fcmService.sendMessageTo(fcmMessageDto);

      } catch (PartyRequestNotFoundException e) {
        log.error("멤버정보와 일치하는 partyRequest 찾지 못함", e);
      } catch (Exception e) {
        log.error("푸시알림 오류 발생", e);
      }
    }
  }

  // 5. 멤버 수락/거절 -> 멤버 상태 설정
  @Transactional
  public HashMap<Long, String> setPartyAcceptStatus(String uuid, Long memberId, Integer themeId, boolean accept)
      throws JsonProcessingException {
    String key = "PARTYMATCH:" + uuid;
    HashMap<Long, String> partyAcceptRecordMap = redisUtil.getLongStringHashMap(key);

    if (partyAcceptRecordMap == null) {
      partyRequestUtil.partyBroke(uuid);
      return null; //expired되었다면 null 반환
    }

    // expired되지 않은 경우
    if (accept) {
      //레디스 작업
      //처음 수락했다면 해당 멤버를 master로 설정
      if (partyAcceptRecordMap.get(-1L).equals(" ")) {
        partyAcceptRecordMap.put(-1L, memberId.toString());
      }

      String status = partyAcceptRecordMap.get(memberId);
      if (Objects.equals(status, "TBD")) {
        partyAcceptRecordMap.put(memberId, "ACCEPT"); // 해당 멤버 상태 업데이트
        int acceptMemberCnt = Integer.parseInt(partyAcceptRecordMap.get(-2L));
        acceptMemberCnt++;
        partyAcceptRecordMap.put(-2L, Integer.toString(acceptMemberCnt)); //accept한 멤버 수 업데이트

        //mysql 작업
        PartyRequest partyRequest = partyRequestRepository.findByThemeIdandMemberId(themeId, memberId);
        if (partyRequest == null) {
          throw new IllegalArgumentException();
        }
        partyRequest.changeStatus(MatchingStatus.PENDING);
      }

      return partyAcceptRecordMap;
    } else {
      //한명이라도 거절하면 파티 깨짐
      partyRequestUtil.partyBroke(uuid);
      redisUtil.deleteData(key);
    }
    return null;
  }

  // 오후 7시에 파티 요청 status를 not_matched로 바꾸는 함수
  @Scheduled(cron = "0 0 19 * * *", zone = "Asia/Seoul")
  @Transactional
  public void makePartyRequestNotMatched() {
    int result = partyRequestRepository.updateAllPartyRequestStatus(MatchingStatus.NOT_MATCHED);
    log.info("오후 7시 업데이트: 총 {}행 변경", result);
  }

}
