package com.moreroom.domain.party.service;
import com.moreroom.domain.mapping.member.entity.MemberPartyMapping;
import com.moreroom.domain.mapping.member.repository.MemberPartyMappingRepository;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.member.exception.MemberNotFoundException;
import com.moreroom.domain.member.repository.MemberRepository;
import com.moreroom.domain.party.entity.Party;
import com.moreroom.domain.party.repository.PartyRepository;
import com.moreroom.domain.partyRequest.entity.PartyRequest;
import com.moreroom.domain.partyRequest.repository.PartyRequestRepository;
import com.moreroom.domain.theme.entity.Theme;
import com.moreroom.domain.theme.repository.ThemeRepository;
import com.moreroom.global.dto.SocketNotificationDto;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Transactional(readOnly = true)
public class PartyService {

  private final MemberRepository memberRepository;
  private final ThemeRepository themeRepository;
  private final PartyRepository partyRepository;
  private final MemberPartyMappingRepository memberPartyMappingRepository;
  private final SimpMessagingTemplate simpMessagingtemplate;
  private final PartyRequestRepository partyRequestRepository;

  //파티 만들고 유저 참가시키기
  @Transactional
  public void createPartyAndJoin(Integer themeId, HashMap<Long, String> partyAcceptMap, String uuid) {
    Theme theme = themeRepository.findById(themeId).orElseThrow();
    Party party = createInitialParty(theme, partyAcceptMap); //파티 만들기
    partyRepository.save(party); //파티 저장
    joinToParty(partyAcceptMap, party); //파티 참가
    changePartyRequestStatus(uuid); //partyRequest 삭제
  }

  // 파티 만들기
  private Party createInitialParty(Theme theme, HashMap<Long, String> partyAcceptMap) {
    Member master = nominateMaster(partyAcceptMap); //방장

    return Party.builder()
        .theme(theme)
        .masterMember(master)
        .roomName(theme.getTitle() + " " + master.getNickname())
        .maxMember(3)
        .build();
  }

  // 방장 정하기
  private Member nominateMaster(HashMap<Long, String> partyAcceptMap) {
    Long masterId = Long.parseLong(partyAcceptMap.get(-1L));
    return memberRepository.findById(masterId)
        .orElseThrow(MemberNotFoundException::new);
  }

  //유저 파티에 참가시키기 (매핑테이블 저장)
  @Transactional
  public void joinToParty(HashMap<Long, String> partyAcceptMap, Party party) {
    for (Long memberId : partyAcceptMap.keySet()) {
      if (memberId > 0) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(MemberNotFoundException::new);
        memberPartyMappingRepository.save(new MemberPartyMapping(member, party));
        joinToChatRoom(member, party); //유처 채팅채널 구독하라고 메세지 보내기
      }
    }
  }

  //유저 채팅방에 참여시키기
  private void joinToChatRoom(Member member, Party party) {
    simpMessagingtemplate.convertAndSendToUser(
        member.getEmail(),
        "/queue/message",
        new SocketNotificationDto("CHATROOM_SUBSCRIBE", party.getPartyId()));
  }

  //partyRequest 삭제
  @Transactional
  public void changePartyRequestStatus(String uuid) {
    List<PartyRequest> partyRequestList = partyRequestRepository.findByUuid(uuid);
    partyRequestRepository.deleteAll(partyRequestList);
  }

  //채팅방 참여 알림 메세지 만들기
  public String makeWelcomeMessage(Long partyId, Member member) {
    StringBuilder sb = new StringBuilder();
    Party party = partyRepository.findById(partyId).orElseThrow();
    return sb.append(member.getNickname())
        .append("님이 ")
        .append(party.getRoomName())
        .append(" 파티에 참여했습니다.")
        .toString();
  }



}
