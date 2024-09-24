package com.moreroom.domain.partyRequest.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.member.exception.MemberNotFoundException;
import com.moreroom.domain.member.repository.MemberRepository;
import com.moreroom.domain.partyRequest.dto.PartyRequestNotificationDto;
import com.moreroom.domain.partyRequest.entity.MatchingStatus;
import com.moreroom.domain.partyRequest.entity.PartyRequest;
import com.moreroom.domain.partyRequest.repository.PartyRequestRepository;
import com.moreroom.domain.theme.entity.Theme;
import com.moreroom.domain.theme.repository.ThemeRepository;
import com.moreroom.global.dto.SocketNotificationDto;
import com.moreroom.global.util.RedisUtil;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class PartyMatchingService {

  private final MemberRepository memberRepository;
  private final PartyRequestRepository partyRequestRepository;
  private final RedisUtil redisUtil;
  private final SimpMessagingTemplate simpMessagingtemplate;
  private final ThemeRepository themeRepository;
  private final RestTemplate restTemplate;

  private final String fastAPI_URL;

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
  private List<Member> getPartyMembersFromIds(List<Integer> memberIds) {
    List<Member> members = new ArrayList<>();
    for (Integer memberId : memberIds) {
      Member member = memberRepository.findById(Long.valueOf(memberId)).orElseThrow(MemberNotFoundException::new);
      members.add(member);
    }
    return members;
  }

//  @Scheduled(cron = "0 0 18 * * *", zone = "Asia/Seoul")
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
      List<Member> partyMembers = getPartyMembersFromIds(partyMemberIds);

      // 파티 매칭 UUID 생성 및 처리
      List<Long> memberIdList = partyMembers.stream()
          .map(Member::getMemberId)
          .toList();

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

    List<PartyRequest> partyRequestList = partyRequestRepository.findByThemeIdandMemberIdList(
        themeId, memberIdList);

    for (PartyRequest pr : partyRequestList) { //dirty checking update
      pr.setUuid(uuid);
      pr.changeStatus(MatchingStatus.MATCHED);
    }

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

  // 4. 멤버에게 파티 참가 요청 보내기 -> fcm 쓸지 web notification 쓸지 정해야함. 학습곡선 있을 것 같아서 일단 후순위로 미룸
  // 일단 급한대로 소켓요청 보내는 형식으로 구현한다.
  public void sendPartyNotification(List<Member> partyMemberList, Integer themeId, String uuid) {
    Theme theme = themeRepository.findById(themeId).orElseThrow(); //throws NoSuchElementException
    String cafeName = theme.getCafe().getCafeName(); //쿼리 추가 실행

    for (Member member : partyMemberList) {
      PartyRequest partyRequest = partyRequestRepository.findByThemeIdandMemberId( //쿼리 실행
          theme.getThemeId(), member.getMemberId());
      // 메세지 전송
      simpMessagingtemplate.convertAndSendToUser(
          member.getEmail(),
          "/queue/message",
          new PartyRequestNotificationDto(
              "PARTY_REQUEST",
              theme.getTitle(),
              cafeName,
              partyRequest.getPartyRequestId(),
              uuid,
              theme.getThemeId()));
    }
  }

  // 5. 멤버 수락/거절 -> 멤버 상태 설정
  @Transactional
  public HashMap<Long, String> setPartyAcceptStatus(String uuid, Long memberId, Integer themeId, boolean accept)
      throws JsonProcessingException {
    String key = "PARTYMATCH:" + uuid;
    HashMap<Long, String> partyAcceptRecordMap = redisUtil.getLongStringHashMap(key);

    if (partyAcceptRecordMap == null) {
      partyBroke(uuid);
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
      partyBroke(uuid);
      redisUtil.deleteData(key);
    }
    return null;
  }

  // 파티 깨진 경우
  @Transactional
  public void partyBroke(String uuid) throws JsonProcessingException {
    List<PartyRequest> partyRequestList = partyRequestRepository.findByUuid(uuid);

    for (PartyRequest request : partyRequestList) {
      request.changeStatus(MatchingStatus.NOT_MATCHED);
      request.setUuid(null);
      //파티 실패 알림 -> 3번의 쿼리가 추가적으로 실행됨(request.getMember().getEmail())
      simpMessagingtemplate.convertAndSendToUser(
          request.getMember().getEmail(),
          "/queue/message",
          new SocketNotificationDto("PARTY_BROKEN", "파티가 매칭되지 않았습니다."));
    }
  }

}
