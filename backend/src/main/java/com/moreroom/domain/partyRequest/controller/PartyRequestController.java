package com.moreroom.domain.partyRequest.controller;

import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.partyRequest.dto.ActivateDto;
import com.moreroom.domain.partyRequest.dto.MockDto;
import com.moreroom.domain.partyRequest.dto.PartyRequestDto;
import com.moreroom.domain.partyRequest.dto.SettingPartyRequestDto;
import com.moreroom.domain.partyRequest.entity.PartyRequest;
import com.moreroom.domain.partyRequest.service.PartyRequestService;
import com.moreroom.global.util.FindMemberService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequestMapping("/party/partyRequest")
@RequiredArgsConstructor
@Slf4j
public class PartyRequestController {

  private final FindMemberService findMemberService;
  private final PartyRequestService partyRequestService;

  //파티요청 목록 조회
  @GetMapping("")
  public ResponseEntity<?> getMyPartyRequest() {
    Long currentMemberId = findMemberService.findCurrentMember();
    List<PartyRequestDto> partyRequestList = partyRequestService.getPartyRequestList(currentMemberId);

    Map<String, List<PartyRequestDto>> response = new HashMap<>();
    response.put("requestList", partyRequestList);
    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  //파티요청 등록
  @PostMapping("")
  public ResponseEntity<?> setMyPartyRequest(@RequestBody SettingPartyRequestDto dto) {
    Member member = findMemberService.findCurrentMemberObject();
    partyRequestService.savePartyRequest(dto, member);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  //파티요청 삭제
  @DeleteMapping("/{partyRequestId}")
  public ResponseEntity<?> deleteMyPartyRequest(@PathVariable Long partyRequestId) {
    partyRequestService.deletePartyRequest(partyRequestId);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  //파티요청 비활성화
  @PatchMapping("/{partyRequestId}")
  public ResponseEntity<?> activatePartyRequest(@RequestBody ActivateDto activateDto, @PathVariable Long partyRequestId) {
    partyRequestService.activateOrDeactivatePartyRequest(activateDto.isActivate(), partyRequestId);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  //파티요청 정보 수정
  @PatchMapping("/{partyRequestId}/settings")
  public ResponseEntity<?> updatePartyRequestSetting(@PathVariable Long partyRequestId, @RequestBody SettingPartyRequestDto dto) {
    partyRequestService.updatePartyRequestSettings(partyRequestId, dto);
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
