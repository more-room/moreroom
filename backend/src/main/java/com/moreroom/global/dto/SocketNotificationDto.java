package com.moreroom.global.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SocketNotificationDto {
  private String type;
  private String message;
  private Long partyId;
  private String uuid;

  public SocketNotificationDto(String type, String message) {
    this.type = type;
    this.message = message;
  }

  public SocketNotificationDto(String type, String message, String uuid) {
    this.type = type;
    this.message = message;
    this.uuid = uuid;
  }

  public SocketNotificationDto(String type, Long partyId) {
    this.type = type;
    this.partyId = partyId;
  }
}
