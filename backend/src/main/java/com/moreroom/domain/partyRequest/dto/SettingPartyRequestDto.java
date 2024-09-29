package com.moreroom.domain.partyRequest.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class SettingPartyRequestDto {
  private Integer themeId;
  private int[] partyHashtagIdList;
  private int[] myHashtagIdList;
  private int[] yourHashtagIdList;
}
