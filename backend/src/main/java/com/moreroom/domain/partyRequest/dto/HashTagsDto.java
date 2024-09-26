package com.moreroom.domain.partyRequest.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class HashTagsDto {
  private int hashtagId;
  private String hashtagName;
}
