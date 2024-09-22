package com.moreroom.domain.partyRequest.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.moreroom.domain.cafe.entity.Cafe;
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
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Transactional(readOnly = true)
public class PartyMatchingService {

  private final MemberRepository memberRepository;
  private final PartyRequestRepository partyRequestRepository;
  private final RedisUtil redisUtil;
  private final SimpMessagingTemplate simpMessagingtemplate;
  private final ThemeRepository themeRepository;

  @Scheduled(cron = "0 0 18 * * *", zone = "Asia/Seoul")
  @Transactional
  public void partyMatchingAndRequest() throws JsonProcessingException {
    //TODO 파티매칭 로직 넣기 -> themeId와 MemberList를 줘야 한다.
    List<Member> partyMembers = getPartyMembers(); //임시
    Integer themeId = 263;
    List<Long> memberIdList = partyMembers.stream()
        .map(Member::getMemberId)
        .toList();

    String uuid = setUuidToRequest(memberIdList, themeId); //partyRequest의 uuid 필드에 uuid 저장
    setPartyAcceptRecordMap(uuid, memberIdList); //redis에 accept 현황판 저장
    sendPartyNotification(partyMembers, themeId, uuid); //알림 보내기
  }


  // 1. 파티 매칭 결과 : 유저 3명 데려오기 -> 임시로 구현함. 이후에 파티 매칭 로직 완성되면 거기에서 받아와야 함
  // 개발용 임시 정보 : 각각 memberId 1212, 1627, 1841 / themeId : 263인 partyRequest
  // partyRequest: 각각 863, 826, 114
  public List<Member> getPartyMembers() {
    Member member1 = memberRepository.findByEmail("hyeonu64@example.org")
        .orElseThrow(MemberNotFoundException::new);
    Member member2 = memberRepository.findByEmail("jeongho91@example.net")
        .orElseThrow(MemberNotFoundException::new);
    Member member3 = memberRepository.findByEmail("jeonghobag@example.net")
        .orElseThrow(MemberNotFoundException::new);
    return Arrays.asList(member1, member2, member3);
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
      //메세지 전송
      simpMessagingtemplate.convertAndSendToUser(
          member.getEmail(),
          "/queue/message",
          new PartyRequestNotificationDto(
              "PARTY_REQUEST",
              theme.getTitle(),
              cafeName,
              partyRequest.getPartyRequestId(),
              uuid));
    }
  }

  // 5. 멤버 수락/거절 -> 멤버 상태 설정
  @Transactional
  public boolean setPartyAcceptStatus(String uuid, Long memberId, Integer themeId, boolean accept)
      throws JsonProcessingException {
    String key = "PARTYMATCH:" + uuid;
    HashMap<Long, String> partyAcceptRecordMap = redisUtil.getLongStringHashMap(key);

    if (partyAcceptRecordMap == null) {
      partyBroke(uuid);
      return false; //expired되었다면 false 반환
    }

    //expired되지 않은 경우
    if (accept) {
      //레디스 작업
      //처음 수락했다면 해당 멤버를 master로 설정
      if (partyAcceptRecordMap.get(-1L).equals(" ")) {
        partyAcceptRecordMap.put(-1L, memberId.toString());
      }

      partyAcceptRecordMap.put(memberId, "ACCEPT"); // 해당 멤버 상태 업데이트
      int acceptMemberCnt = Integer.parseInt(partyAcceptRecordMap.get(-2L));
      acceptMemberCnt++;
      partyAcceptRecordMap.put(-2L, Integer.toString(acceptMemberCnt)); //accept한 멤버 수 업데이트

      //mysql 작업
      PartyRequest partyRequest = partyRequestRepository.findByThemeIdandMemberId(themeId, memberId);
      partyRequest.changeStatus(MatchingStatus.PENDING);
      return true;
    } else {
      //한명이라도 거절하면 파티 깨짐
      partyBroke(uuid);
      redisUtil.deleteData(key);
    }
    return false;
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
          new SocketNotificationDto("PARTY-BROKEN", "파티 매칭 실패"));
    }
  }

}
