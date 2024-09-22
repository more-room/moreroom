package com.moreroom.domain.partyRequest.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PartyRequestNotificationDto {
  private String type;
  private String themeName;
  private String cafeName;
  private Long partyRequestId;
  private String uuid;
  private Integer themeId;
}
