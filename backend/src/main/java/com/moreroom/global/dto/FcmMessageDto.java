package com.moreroom.global.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * FCM 전송 Format DTO
 *
 * POST https://fcm.googleapis.com/v1/projects/d206-moreroom/messages:send HTTP/1.1
 *
 * Content-Type: application/json
 * Authorization: Bearer ya29.ElqKBGN2Ri_Uz...HnS_uNreA
 *
 * {
 *    "message":{
 *       "token":"bk3RNwTe3H0:CI2k_HHwgIpoDKCIZvvDMExUdFQ3P1...",
 *       "notification":{
 *         "body":"This is an FCM notification message!",
 *         "title":"FCM Message"
 *       },
 *       "data":{
 *         "type":"PARTY_BROKEN",
 *         "message":"파티가 매칭되지 않았습니다."
 *       },
 *    }
 * }
 *
 * 위와 같은 정보를 포함해서 전송하기 위해 아래 객체 구성
 *
 */


@Getter
@Builder
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FcmMessageDto {
  private boolean validateOnly;
  private FcmMessageDto.Message message;

  @Builder
  @AllArgsConstructor
  @Getter
  @JsonInclude(JsonInclude.Include.NON_NULL)
  public static class Message {
    private String token;
    private FcmMessageDto.Notification notification;
    private FcmMessageDto.Data data;
  }

  @Builder
  @AllArgsConstructor
  @Getter
  @JsonInclude(JsonInclude.Include.NON_NULL)
  public static class Notification {
    private String title;
    private String body;
  }

  @Builder
  @AllArgsConstructor
  @Getter
  @JsonInclude(JsonInclude.Include.NON_NULL)
  public static class Data {
    private MessageType type;
    private String themeName;
    private String cafeName;
    private Long partyRequestId;
    private String uuid;
    private Integer themeId;
    private Long partyId;
    private String message;
  }

  public enum MessageType {
    PARTY_REQUEST,
    CHATROOM_SUBSCRIBE,
    PARTY_BROKEN
  }
}
