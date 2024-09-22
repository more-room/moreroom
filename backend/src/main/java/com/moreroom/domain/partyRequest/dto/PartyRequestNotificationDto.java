package com.moreroom.domain.partyRequest.dto;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class PartyRequestNotificationDto {
  private String type;
  private String themeName;
  private String cafeName;
  private Long partyRequestId;
  private String uuid;
}
