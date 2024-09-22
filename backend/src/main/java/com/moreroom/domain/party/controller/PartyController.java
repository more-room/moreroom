package com.moreroom.domain.party.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.moreroom.domain.party.dto.PartyRequestAcceptDto;
import com.moreroom.domain.partyRequest.service.PartyMatchingService;
import com.moreroom.global.util.FindMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value="/party")
@RequiredArgsConstructor
public class PartyController {

  private final PartyMatchingService partyMatchingService;
  private final FindMemberService findMemberService;

  @PostMapping("")
  public ResponseEntity<?> acceptPartyRequest(@RequestBody PartyRequestAcceptDto dto)
      throws JsonProcessingException {
    Long memberId = findMemberService.findCurrentMember();
    partyMatchingService.setPartyAcceptStatus(dto.getUuid(), memberId, dto.getThemeId(), dto.isAccept());
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
