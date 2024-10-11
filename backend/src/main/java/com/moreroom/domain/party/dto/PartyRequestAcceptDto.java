package com.moreroom.domain.party.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.moreroom.domain.partyRequest.entity.MatchingStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PartyRequestAcceptDto {
  private boolean accept;
  private String uuid;
  private Integer themeId;
  private MatchingStatus status;

  public PartyRequestAcceptDto(boolean accept, MatchingStatus status) {
    this.accept = accept;
    this.status = status;
  }
}
