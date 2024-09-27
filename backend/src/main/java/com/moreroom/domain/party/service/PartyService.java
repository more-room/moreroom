package com.moreroom.domain.party.service;
import com.moreroom.domain.mapping.member.entity.MemberPartyMapping;
import com.moreroom.domain.mapping.member.repository.MemberPartyMappingRepository;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.member.exception.MemberNotFoundException;
import com.moreroom.domain.member.repository.MemberRepository;
import com.moreroom.domain.party.dto.ChatroomListDto;
import com.moreroom.domain.party.dto.ChatroomSettingDto;
import com.moreroom.domain.party.dto.NoticeDto;
import com.moreroom.domain.party.dto.PartyInfoDto;
import com.moreroom.domain.party.entity.Party;
import com.moreroom.domain.party.exception.InputValidationException;
import com.moreroom.domain.party.exception.NotPartyMasterException;
import com.moreroom.domain.party.exception.PartyFullException;
import com.moreroom.domain.party.exception.PartyNotFoundException;
import com.moreroom.domain.party.exception.PartyNotRecruitingException;
import com.moreroom.domain.party.repository.PartyQueryRepository;
import com.moreroom.domain.party.repository.PartyRepository;
import com.moreroom.domain.partyRequest.entity.PartyRequest;
import com.moreroom.domain.partyRequest.repository.PartyRequestRepository;
import com.moreroom.domain.theme.entity.Theme;
import com.moreroom.domain.theme.repository.ThemeRepository;
import com.moreroom.global.dto.SocketNotificationDto;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
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
  private final PartyQueryRepository partyQueryRepository;
  private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");


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
//  @Transactional
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
//  @Transactional
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

  // 채팅방(파티)에 참가하기 -> 이후에 동시성 개념 넣기
  @Transactional
  public void joinExistParty(Member member, Long partyId) {
    //파티 인원이 들어갈 수 있는지 확인
    Party party = partyRepository.findById(partyId).orElseThrow(PartyNotFoundException::new);
    if (party.isAddFlag()) {
      int currentMembers = memberPartyMappingRepository.getNumberOfMemberByPartyId(partyId);
      int maxMember = party.getMaxMember();
      if (currentMembers < maxMember) {
        //파티 정원 안참 : 저장
        memberPartyMappingRepository.save(new MemberPartyMapping(member, party));
        //이미 가입한 파티일 때는?? 방어로직 추가 필요
      } else {
        //파티 정원 다 참 : 예외 던짐
        throw new PartyFullException();
      }
    } else {
      // 인원을 모집하지 않는 파티임
      throw new PartyNotRecruitingException();
    }
  }

  // 채팅방에서 나가기
  @Transactional
  public void leaveParty(Member member, Long partyId) {
    Party party = partyRepository.findById(partyId).orElseThrow(PartyNotFoundException::new);
    MemberPartyMapping memberParty = memberPartyMappingRepository.findByMemberAndParty(member, party).orElse(null);
    if (memberParty == null) return;
    memberPartyMappingRepository.delete(memberParty);
  }

  //모든 파티 조회
  public ChatroomListDto getAllPartyList(Member member, Long lastPartyId, int pageSize) {
    ChatroomListDto allPartyList = partyQueryRepository.getAllPartyListByMemberId(member.getMemberId(), false, lastPartyId, pageSize);
    return allPartyList;
  }

  //멤버 파티 조회
  public ChatroomListDto getMyPartyList(Member member, Long lastPartyId, int pageSize) {
    ChatroomListDto myPartyInfoList = partyQueryRepository.getAllPartyListByMemberId(member.getMemberId(), true, lastPartyId, pageSize);
    return myPartyInfoList;
  }

  //채팅방 공지사항 등록
  @Transactional
  public void updateChatroomNotice(Member member, Long partyId, NoticeDto notice) {
    Party party = partyRepository.findById(partyId).orElseThrow(PartyNotFoundException::new);
    validUser(member, party);
    if (notice.getNotice().length() > 300) {
      throw new InputValidationException();
    }
    party.setNotice(notice.getNotice());
  }

  // 채팅방 세팅 조회
  public ChatroomSettingDto getSettingInfo(Long partyId) {
    Party party = partyRepository.findById(partyId).orElseThrow(PartyNotFoundException::new);
    String date = party.getDate().format(formatter);
    return ChatroomSettingDto.builder()
        .roomName(party.getRoomName())
        .themeId(party.getTheme().getThemeId())
        .date(date)
        .maxMember(party.getMaxMember())
        .addFlag(party.isAddFlag())
        .build();
  }

  // 채팅방 세팅 수정
  @Transactional
  public void updateSettingInfo(Long partyId, ChatroomSettingDto dto, Member member) {
    Party party = partyRepository.findById(partyId).orElseThrow(PartyNotFoundException::new);
    validUser(member, party);
    String roomname = dto.getRoomName();
    LocalDateTime date = LocalDateTime.parse(dto.getDate(), formatter);
    if (roomname.length() > 50) {
      throw new InputValidationException();
    }
    party.setSettings(roomname, date, dto.isAddFlag(), dto.getMaxMember());
  }

  private void validUser(Member member, Party party) {
    if (!Objects.equals(party.getMasterMember().getMemberId(), member.getMemberId())) {
      throw new NotPartyMasterException();
    }
  }

}
