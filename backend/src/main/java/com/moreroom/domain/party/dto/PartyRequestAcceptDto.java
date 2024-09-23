package com.moreroom.domain.party.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class PartyRequestAcceptDto {
  private boolean accept;
  private String uuid;
  private Integer themeId;
}
