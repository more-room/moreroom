package com.moreroom.domain.partyRequest.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.member.exception.MemberNotFoundException;
import com.moreroom.domain.member.repository.MemberRepository;
import com.moreroom.domain.partyRequest.entity.PartyRequest;
import com.moreroom.domain.partyRequest.repository.PartyRequestRepository;
import com.moreroom.global.util.RedisUtil;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Transactional(readOnly = true)
public class PartyRequestService {

  private final MemberRepository memberRepository;
  private final PartyRequestRepository partyRequestRepository;
  private final RedisUtil redisUtil;

  // 1. 파티 매칭 결과 : 유저 3명 데려오기 -> 임시로 구현함. 이후에 파티 매칭 로직 완성되면 거기에서 받아와야 함
  // 개발용 임시 정보 : 각각 memberId 1212, 1627, 1841 / themeId : 263인 partyRequest
  // partyRequest: 각각 863, 826, 114
  private List<Member> getPartyMembers() {
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
  protected String getUUID(List<Member> partyMembers, Long themeId) {
    String uuid = UUID.randomUUID().toString();

    List<Long> memberIdList = partyMembers.stream()
        .map(Member::getMemberId)
        .toList();

    List<PartyRequest> partyRequestList = partyRequestRepository.findByThemeIdandMemberIdList(
        themeId, memberIdList);

    for (PartyRequest pr : partyRequestList) {
      pr.setUuid(uuid); //dirty checking update
    }

    return uuid;
  }

  // 3. 레디스 맵 만들기
  private void setPartyAcceptRecordMap(String uuid, List<Long> memberIdList)
      throws JsonProcessingException {
    String key = "PARTYMATCH:" + uuid;

    // key: memberId; value: ACCEPT, REJECT, TBD(미정); key == -1 -> value: master memberId
    HashMap<Long, String> partyAcceptRecordMap = new HashMap<>();
    for (Long memberId : memberIdList) {
      partyAcceptRecordMap.put(memberId, "TBD");
    }
    redisUtil.saveLongStringHashMapExpire(key, partyAcceptRecordMap, 3600);
  }

  // 4. 멤버 상태 설정
  private void setPartyAcceptStatus(String uuid, Long memberId, boolean accept) {
    if (accept) {

    } else {
      //파티 깨짐
    }
  }

}
