package com.moreroom.domain.party.service;
import com.moreroom.domain.deviceToken.dto.FcmMessageDto;
import com.moreroom.domain.deviceToken.service.FcmService;
import com.moreroom.domain.mapping.member.entity.MemberPartyMapping;
import com.moreroom.domain.mapping.member.repository.MemberPartyMappingRepository;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.member.exception.MemberNotFoundException;
import com.moreroom.domain.member.repository.MemberRepository;
import com.moreroom.domain.party.dto.*;
import com.moreroom.domain.party.entity.Party;
import com.moreroom.domain.party.exception.*;
import com.moreroom.domain.party.repository.PartyQueryRepository;
import com.moreroom.domain.party.repository.PartyRepository;
import com.moreroom.domain.partyRequest.entity.PartyRequest;
import com.moreroom.domain.partyRequest.repository.PartyRequestRepository;
import com.moreroom.domain.theme.entity.Theme;
import com.moreroom.domain.theme.repository.ThemeRepository;
import com.moreroom.global.util.StringUtil;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class PartyService {

  private final MemberRepository memberRepository;
  private final ThemeRepository themeRepository;
  private final PartyRepository partyRepository;
  private final MemberPartyMappingRepository memberPartyMappingRepository;
  private final PartyRequestRepository partyRequestRepository;
  private final PartyQueryRepository partyQueryRepository;
  private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
  private final FcmService fcmService;


  //파티 만들고 유저 참가시키기
  @Transactional
  public void createPartyAndJoin(Integer themeId, HashMap<Long, String> partyAcceptMap, String uuid) {
    Theme theme = themeRepository.findById(themeId).orElseThrow();
    Party party = createInitialParty(theme, partyAcceptMap); //파티 만들기
    partyRepository.save(party); //파티 저장
    joinToParty(partyAcceptMap, party, theme); //파티 참가
    changePartyRequestStatus(uuid); //partyRequest 삭제
  }

  // 파티 만들기
  private Party createInitialParty(Theme theme, HashMap<Long, String> partyAcceptMap) {
    Member master = nominateMaster(partyAcceptMap); //방장

    return Party.builder()
        .theme(theme)
        .masterMember(master)
        .notice("[" + theme.getTitle() + "]테마의 파티 채팅방입니다. 공지사항을 입력해 주세요.")
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
  public void joinToParty(HashMap<Long, String> partyAcceptMap, Party party, Theme theme) {
    for (Long memberId : partyAcceptMap.keySet()) {
      if (memberId > 0) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(MemberNotFoundException::new);
        memberPartyMappingRepository.save(new MemberPartyMapping(member, party));
        joinToChatRoom(member, party, theme); //유처 채팅채널 구독하라고 메세지 보내기
      }
    }
  }

  //유저 채팅방에 참여시키기 - 클라이언트에 알림 보내기
  private void joinToChatRoom(Member member, Party party, Theme theme) {
    FcmMessageDto fcmMessageDto = fcmService.makeChatroomSubscribeMessage(party.getPartyId(), theme,
        member);
    fcmService.sendMessageTo(fcmMessageDto);
  }

  //partyRequest 삭제
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

  // 존재하는 채팅방(파티)에 참가하기
  @Transactional(timeout = 5)
  public void joinExistParty(Member member, Long partyId) {
    //검증단계
    //파티 인원이 들어갈 수 있는지 확인 - 비관적 락 사용
    Party party = partyRepository.findByPartyIdWithPessimisticLock(partyId).orElseThrow(PartyNotFoundException::new);
    //인원을 모집하지 않는 파티임
    if (!party.isAddFlag()) throw new PartyNotRecruitingException();
    //이미 가입한 파티라면 트랜잭션 종료
    MemberPartyMapping memberParty = memberPartyMappingRepository.findByMemberAndParty(member, party).orElseGet(null);
    if (memberParty != null) throw new JoinedPartyException();

    //참가단계
    int currentMembers = memberPartyMappingRepository.getNumberOfMemberByPartyId(partyId);
    int maxMember = party.getMaxMember();
    if (currentMembers < maxMember) {
      //파티 정원 안참 : 저장
      memberPartyMappingRepository.save(new MemberPartyMapping(member, party));
    } else {
      //파티 정원 다 참 : 예외 던짐
      throw new PartyFullException();
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

  public NoticeDto readChatroomNotice(Long partyId) {
    Party party = partyRepository.findById(partyId).orElseThrow(PartyNotFoundException::new);
    String notice = party.getNotice() == null || party.getNotice().equals("") ? null : party.getNotice();
    return new NoticeDto(notice);
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
    LocalDateTime date = StringUtil.stringToDatetime(dto.getDate());
    if (roomname.length() > 50) {
      throw new InputValidationException();
    }
    party.setSettings(roomname, date, dto.isAddFlag(), dto.getMaxMember());
  }

  //마스터인지 검사하는 메서드
  private void validUser(Member member, Party party) {
    if (!Objects.equals(party.getMasterMember().getMemberId(), member.getMemberId())) {
      throw new NotPartyMasterException();
    }
  }

  //파티id 리스트
  public PartyIdListDto getPartyIdList(Member member) {
    List<Long> partyIdList = memberPartyMappingRepository.getPartyIdListByMemberId(member.getMemberId());
    return new PartyIdListDto(partyIdList);
  }

  //파티 멤버 조회
  public PartyMemberDto getPartyMemberList(Long partyId) {
      return partyQueryRepository.getPartyMemberList(partyId);
  }

  //파티 멤버 강퇴
  @Transactional
  public void kickOutMember(Member master, Long memberId, Long partyId) {
    //방장인지 검사
    Party party = partyRepository.findById(partyId).orElseThrow(PartyNotFoundException::new);
    validUser(master, party);
    //partymembermapping테이블에서 삭제
    memberPartyMappingRepository.deleteMemberPartyMappingByMemberAndParty(memberId, partyId);
  }

}
