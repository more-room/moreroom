package com.moreroom.domain.partyRequest.controller;

import com.moreroom.domain.partyRequest.dto.MockDto;
import com.moreroom.domain.partyRequest.entity.PartyRequest;
import com.moreroom.domain.partyRequest.service.PartyRequestService;
import com.moreroom.global.util.FindMemberService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequestMapping("/party/partyRequest")
@RequiredArgsConstructor
public class PartyRequestController {

  private final FindMemberService findMemberService;
  private final PartyRequestService partyRequestService;

  @GetMapping("")
  public ResponseEntity<?> getMyPartyRequest() {
    Long currentMemberId = findMemberService.findCurrentMember();
    List<MockDto> partyRequestList = partyRequestService.getPartyRequestList(currentMemberId);
    return new ResponseEntity<>(partyRequestList, HttpStatus.OK);
  }
}
