package com.moreroom.domain.party.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class PartyRequestAcceptDto {
  private boolean accept;
  private String uuid;
  private Integer themeId;
}
