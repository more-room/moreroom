package com.moreroom.domain.partyRequest.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@ToString
public class ThemeDto {
  private Integer themeId;
  private String poster;
  private String title;
  private String brandName;
  private String branchName;
}
