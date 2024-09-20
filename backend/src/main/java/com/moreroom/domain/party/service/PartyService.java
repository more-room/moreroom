package com.moreroom.domain.party.service;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.party.entity.Party;
import com.moreroom.domain.theme.entity.Theme;
import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class PartyService {

  private final RabbitTemplate rabbitTemplate;


  // 채팅방 만들기
  public Party createInitialParty(Theme theme, Member master) {
    return Party.builder()
        .themeId(theme.getThemeId())
        .masterId(master.getMemberId())
        .roomName(theme.getTitle() + " " + master.getNickname())
        .maxMember(3)
        .build();
  }

  //유저 채팅방에 참가시키기
  @Transactional
  public void joinToParty(Member member, Party party) {
//    memberPartyMappingRepository.save(new MemberPartyMapping(member, party));

  }


}
