package com.moreroom.domain.party.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.party.dto.ChatroomListDto;
import com.moreroom.domain.party.dto.ChatroomSettingDto;
import com.moreroom.domain.party.dto.NoticeDto;
import com.moreroom.domain.party.dto.PartyIdListDto;
import com.moreroom.domain.party.dto.PartyMemberDto;
import com.moreroom.domain.party.dto.PartyMessageLogsDto;
import com.moreroom.domain.party.dto.PartyRequestAcceptDto;
import com.moreroom.domain.party.service.MessageService;
import com.moreroom.domain.party.service.PartyService;
import com.moreroom.domain.partyRequest.entity.MatchingStatus;
import com.moreroom.domain.partyRequest.service.PartyMatchingService;
import com.moreroom.domain.partyRequest.service.PartyMatchingService.Accept;
import com.moreroom.global.util.FindMemberService;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping(value="/party")
@RequiredArgsConstructor
public class PartyController {

  private final PartyMatchingService partyMatchingService;
  private final FindMemberService findMemberService;
  private final PartyService partyService;
  private final MessageService messageService;

  //파티 참가 수락/거절
//  @PostMapping()
//  public ResponseEntity<?> acceptPartyRequest(@RequestBody PartyRequestAcceptDto dto) throws JsonProcessingException {
//    Long memberId = findMemberService.findCurrentMember();
//    //파티 참가 상태 업데이트
//    HashMap<Long, String> partyAcceptMap = partyMatchingService.setPartyAcceptStatus(dto.getUuid(), memberId, dto.getThemeId(), dto.isAccept());
//
//    if (partyAcceptMap == null) {
//      // null일 때는 파티매칭에 실패한 경우
//      return new ResponseEntity<>(new PartyRequestAcceptDto(false, MatchingStatus.NOT_MATCHED), HttpStatus.OK);
//    }
//    if (partyAcceptMap.get(-2L).equals("3")) {
//      //3명 모두 동의한 경우 파티 만들고 참가
//      partyService.createPartyAndJoin(dto.getThemeId(), partyAcceptMap, dto.getUuid());
//      return new ResponseEntity<>(new PartyRequestAcceptDto(true, MatchingStatus.ALL_MATCHED), HttpStatus.OK);
//    }
//    //3명 이하 동의한 경우 파티의 상태는 PENDING으로 바뀔 것임.
//    return new ResponseEntity<>(new PartyRequestAcceptDto(true, MatchingStatus.PENDING), HttpStatus.OK);
//  }

  @PostMapping()
  public ResponseEntity<?> acceptPartyRequestNew(@RequestBody PartyRequestAcceptDto dto) {
    Member member = findMemberService.findCurrentMemberObject();
    boolean accept = dto.isAccept();
    if (accept) {
      Accept result = partyMatchingService.acceptParty(dto, member);
      if (result.equals(Accept.ACCEPTED)) {
        return new ResponseEntity<>(new PartyRequestAcceptDto(true, MatchingStatus.PENDING), HttpStatus.OK);
      } else if (result.equals(Accept.PARTY_MADE)) {
        return new ResponseEntity<>(new PartyRequestAcceptDto(true, MatchingStatus.ALL_MATCHED), HttpStatus.OK);
      }
    } else {
      partyMatchingService.refuseParty(dto);
    }
    return new ResponseEntity<>(new PartyRequestAcceptDto(false, MatchingStatus.NOT_MATCHED), HttpStatus.OK);
  }

  //채팅 내역 조회
  @GetMapping("/chatLogs")
  public ResponseEntity<?> getChattingList(
      @RequestParam Long partyId,
      @RequestParam(required = false) String lastMessageId,
      @RequestParam(defaultValue = "10") int pageSize) throws JsonProcessingException {

    PartyMessageLogsDto messageLogs = messageService.getMessageLogs(partyId, lastMessageId,
        pageSize);
    return new ResponseEntity<>(messageLogs, HttpStatus.OK);
  }

  //채팅방 입장
  @PostMapping("/{partyId}/join")
  public ResponseEntity<?> joinParty(@PathVariable Long partyId) {
    //socket: /topic/party/{partyId}
    Member member = findMemberService.findCurrentMemberObject();
    partyService.joinExistParty(member, partyId);

    Map<String, Object> response = new HashMap<>();
    response.put("successFlag", true);
    response.put("message", "가입에 성공했습니다.");
    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  //채팅방 퇴장
  @DeleteMapping("/{partyId}/leave")
  public ResponseEntity<?> leaveParty(@PathVariable Long partyId) {
    //socket: /topic/party/{partyId}
    Member member = findMemberService.findCurrentMemberObject();
    partyService.leaveParty(member, partyId);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  //전체 채팅방 리스트 조회 (내가 속한X, 비공개X)
  @GetMapping()
  public ResponseEntity<?> getAllChatroomList(@RequestParam(required = false) Long lastPartyId, @RequestParam(defaultValue = "5") int pageSize) {
    Member member = findMemberService.findCurrentMemberObject();
    ChatroomListDto allPartyList = partyService.getAllPartyList(member, lastPartyId, pageSize);
    return new ResponseEntity<>(allPartyList, HttpStatus.OK);
  }

  //내가 속한 채팅방 리스트 조회
  @GetMapping("/member")
  public ResponseEntity<?> getMyChatroomList(@RequestParam(required = false) Long lastPartyId, @RequestParam(defaultValue = "5") int pageSize) {
    Member member = findMemberService.findCurrentMemberObject();
    ChatroomListDto myPartyList = partyService.getMyPartyList(member, lastPartyId, pageSize);
    return new ResponseEntity<>(myPartyList, HttpStatus.OK);
  }

  //채팅방 공지사항 등록
  @PostMapping("/{partyId}/notice")
  public ResponseEntity<?> updateNotice(@RequestBody NoticeDto notice, @PathVariable Long partyId) {
    Member member = findMemberService.findCurrentMemberObject();
    partyService.updateChatroomNotice(member, partyId, notice);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  //채팅방 공지사항 조회
  @GetMapping("/{partyId}/notice")
  public ResponseEntity<?> readNotice(@PathVariable Long partyId) {
    NoticeDto notice = partyService.readChatroomNotice(partyId);
    return new ResponseEntity<>(notice, HttpStatus.OK);
  }

  //채팅방 설정 수정
  @PatchMapping("/{partyId}/settings")
  public ResponseEntity<?> updateChatroomSetting(@PathVariable Long partyId, @RequestBody ChatroomSettingDto dto) {
    Member member = findMemberService.findCurrentMemberObject();
    partyService.updateSettingInfo(partyId, dto, member);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  //채팅방 설정 조회
  @GetMapping("/{partyId}/settings")
  public ResponseEntity<?> getChatroomSetting(@PathVariable Long partyId) {
    ChatroomSettingDto settingInfo = partyService.getSettingInfo(partyId);
    return new ResponseEntity<>(settingInfo, HttpStatus.OK);
  }

  //내가 속한 파티 리스트 조회
  @GetMapping("/channel")
  public ResponseEntity<?> getPartyIdList() {
    Member member = findMemberService.findCurrentMemberObject();
    PartyIdListDto partyIdList = partyService.getPartyIdList(member);
    return new ResponseEntity<>(partyIdList, HttpStatus.OK);
  }

  //파티원 조회
  @GetMapping("/{partyId}/memberList")
  public ResponseEntity<?> getMemberList(@PathVariable Long partyId) {
    PartyMemberDto partyMemberList = partyService.getPartyMemberList(partyId);
    return new ResponseEntity<>(partyMemberList, HttpStatus.OK);
  }

  //파티원 추방
  @PostMapping("/{partyId}/kick-out")
  public ResponseEntity<?> kickOutMember(@RequestParam Long memberId, @PathVariable Long partyId) {
    Member member = findMemberService.findCurrentMemberObject();
    partyService.kickOutMember(member, memberId, partyId);
    return new ResponseEntity<>(HttpStatus.OK);
  }

}
