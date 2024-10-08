package com.moreroom.domain.partyRequest.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.partyRequest.dto.ActivateDto;
import com.moreroom.domain.partyRequest.dto.PartyRequestDto;
import com.moreroom.domain.partyRequest.dto.SettingPartyRequestDto;
import com.moreroom.domain.partyRequest.service.PartyMatchingService;
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
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/party/partyRequest")
@RequiredArgsConstructor
@Slf4j
public class PartyRequestController {

  private final FindMemberService findMemberService;
  private final PartyRequestService partyRequestService;
  private final PartyMatchingService partyMatchingService;

  //파티요청 목록 조회
  @GetMapping()
  public ResponseEntity<?> getMyPartyRequest() {
    Long currentMemberId = findMemberService.findCurrentMember();
    List<PartyRequestDto> partyRequestList = partyRequestService.getPartyRequestList(currentMemberId);

    Map<String, List<PartyRequestDto>> response = new HashMap<>();
    response.put("requestList", partyRequestList);
    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  //파티요청 등록
  @PostMapping()
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

  //파티요청별 해시태그 조회
  @GetMapping("/{partyRequestId}/hashtags")
  public ResponseEntity<?> getPartyRequestHashtags(@PathVariable Long partyRequestId) {
    Member member = findMemberService.findCurrentMemberObject();
    PartyRequestDto hashtagsList = partyRequestService.getHashtagsList(partyRequestId, member);
    return new ResponseEntity<>(hashtagsList, HttpStatus.OK);
  }

  //파티매칭 전체로직 트리거 api (실험용)
  @GetMapping("/party-match-trigger")
  public ResponseEntity<?> trigger() {
    try {
      partyMatchingService.partyMatchingAndRequest();
    } catch (JsonProcessingException e) {
      return new ResponseEntity<>("파티 매칭 중 오류 발생", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<>("파티매칭 성공", HttpStatus.OK);
  }

  //파티매칭 전체로직 트리거 api (실험용)
  @GetMapping("/party-match-trigger-for-one")
  public ResponseEntity<?> triggerForOne(
      @RequestParam(name = "partyRequestId") Long partyRequestId) {
    try {
      partyMatchingService.partyMatchingAndRequestForOne(partyRequestId);
    } catch (JsonProcessingException e) {
      return new ResponseEntity<>("파티 매칭 중 오류 발생", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return new ResponseEntity<>("파티매칭 성공", HttpStatus.OK);
  }

}
