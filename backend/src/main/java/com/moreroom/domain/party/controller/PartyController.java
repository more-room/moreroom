package com.moreroom.domain.party.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.party.dto.ChatroomListDto;
import com.moreroom.domain.party.dto.PartyInfoDto;
import com.moreroom.domain.party.dto.PartyMessageLogsDto;
import com.moreroom.domain.party.dto.PartyRequestAcceptDto;
import com.moreroom.domain.party.service.MessageService;
import com.moreroom.domain.party.service.PartyService;
import com.moreroom.domain.partyRequest.service.PartyMatchingService;
import com.moreroom.global.util.FindMemberService;
import com.querydsl.core.annotations.QueryProjection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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

  @PostMapping("")
  public ResponseEntity<?> acceptPartyRequest(@RequestBody PartyRequestAcceptDto dto)
      throws JsonProcessingException {
    Long memberId = findMemberService.findCurrentMember(); //현재 세션 멤버
    HashMap<Long, String> partyAcceptMap = partyMatchingService.setPartyAcceptStatus(dto.getUuid(), memberId, dto.getThemeId(),
        dto.isAccept()); //파티 참가 상태 업데이트
    if (partyAcceptMap != null && partyAcceptMap.get(-2L).equals("3")) {
      partyService.createPartyAndJoin(dto.getThemeId(), partyAcceptMap, dto.getUuid()); //3명 모두 동의한 경우 파티 만들고 참가
    }

    return new ResponseEntity<>(HttpStatus.OK);
  }

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
  @GetMapping("")
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

}
