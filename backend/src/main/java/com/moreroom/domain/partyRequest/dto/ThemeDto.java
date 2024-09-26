package com.moreroom.domain.partyRequest.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class ThemeDto {
  private Integer themeId;
  private String poster;
  private String title;
}
