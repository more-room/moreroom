package com.moreroom.domain.deviceToken.controller;

import com.moreroom.domain.deviceToken.dto.DeviceTokenRegisterDto;
import com.moreroom.domain.deviceToken.service.DeviceTokenService;
import com.moreroom.domain.deviceToken.service.FcmService;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.deviceToken.dto.FcmMessageDto;
import com.moreroom.global.util.FindMemberService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 모바일로부터 사용자 FCM 토큰, 메세지 제목, 내용을 받아서 서비스를 처리함
 */

@Slf4j
@RestController
@RequestMapping("/api/fcm")
@RequiredArgsConstructor
public class FcmController {
  private final FindMemberService findMemberService;
  private final DeviceTokenService deviceTokenService;

  @PostMapping("/register")
  public ResponseEntity<?> getDeviceToken(@RequestBody DeviceTokenRegisterDto deviceTokenRegisterDto) {
    Member member = findMemberService.findCurrentMemberObject();
    deviceTokenService.saveToken(deviceTokenRegisterDto.getToken(), member);
    return new ResponseEntity<>(HttpStatus.OK);
  }
}

