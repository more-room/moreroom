package com.moreroom.global.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * 모바일에서 전달받은 객체를 매핑하는 DTO
 *
 * @token : 디바이스 기기에서 발급받은 FCM 토큰 값.
 * @title : 디바이스 기기로 전송하려는 푸시메세지 제목
 * @body : 디바이스 기기로 전송하려는 푸시메세지 내용
 */

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FcmSendDto {
  private String token;
  private String title;
  private String body;

  @Builder(toBuilder = true)
  public FcmSendDto(String token, String title, String body) {
    this.token = token;
    this.title = title;
    this.body = body;
  }

}
