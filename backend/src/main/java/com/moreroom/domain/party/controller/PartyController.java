package com.moreroom.domain.party.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.moreroom.domain.party.dto.PartyRequestAcceptDto;
import com.moreroom.domain.party.service.MessageService;
import com.moreroom.domain.party.service.PartyService;
import com.moreroom.domain.partyRequest.service.PartyMatchingService;
import com.moreroom.global.util.FindMemberService;
import java.util.HashMap;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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
      @RequestParam Long partyId, @RequestParam String startId, @RequestParam Integer pageSize
  ) {

    return new ResponseEntity<>(HttpStatus.OK);
  }

}
