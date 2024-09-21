package com.moreroom.domain.party.service;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.member.exception.MemberNotFoundException;
import com.moreroom.domain.member.repository.MemberRepository;
import com.moreroom.domain.party.entity.Party;
import com.moreroom.domain.partyRequest.entity.PartyRequest;
import com.moreroom.domain.partyRequest.repository.PartyRequestRepository;
import com.moreroom.domain.theme.entity.Theme;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Transactional(readOnly = true)
public class PartyService {

  private final MemberRepository memberRepository;

  // 파티 만들기
  private Party createInitialParty(Theme theme, Member master) {
    return Party.builder()
        .theme(theme)
        .masterMember(master)
        .roomName(theme.getTitle() + " " + master.getNickname())
        .maxMember(3)
        .build();
  }

  // 방장 정하기 -> 지금은 임시로 구현. 후에 자세한 구현 필요
  private Member nominateMaster() {
    return memberRepository.findByEmail("jimin49@example.com")
        .orElseThrow(MemberNotFoundException::new);
  }

  //유저 채팅방에 참가시키기
  @Transactional
  public void joinToParty(Member member, Party party) {
//    memberPartyMappingRepository.save(new MemberPartyMapping(member, party));

  }



  // 파티 매칭 결과를 레디스에 저장



}
