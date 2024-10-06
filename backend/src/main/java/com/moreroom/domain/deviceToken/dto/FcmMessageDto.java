package com.moreroom.domain.deviceToken.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

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
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FcmMessageDto {
  private boolean validateOnly;
  private FcmMessageDto.Message message;

  @Builder
  @AllArgsConstructor
  @NoArgsConstructor
  @Getter
  @JsonInclude(JsonInclude.Include.NON_NULL)
  public static class Message {
    private String token;
    private FcmMessageDto.Notification notification;
    private FcmMessageDto.Data data;
  }

  @Builder
  @AllArgsConstructor
  @NoArgsConstructor
  @Getter
  @JsonInclude(JsonInclude.Include.NON_NULL)
  public static class Notification {
    private String title;
    private String body;
  }

  @Builder
  @AllArgsConstructor
  @NoArgsConstructor
  @Getter
  @JsonInclude(JsonInclude.Include.NON_NULL)
  public static class Data {
    private String type;
    private String themeName;
    private String cafeName;
    private String partyRequestId;
    private String uuid;
    private String themeId;
    private String partyId;
    private String message;
  }

  public enum MessageType {
    PARTY_REQUEST,
    CHATROOM_SUBSCRIBE,
    PARTY_BROKEN,
    CHAT_MESSAGE,
  }
}
