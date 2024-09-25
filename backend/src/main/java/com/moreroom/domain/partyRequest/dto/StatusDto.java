package com.moreroom.domain.partyRequest.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class StatusDto {
  private int statusId;
  private String statusName;
  private List<MemberDto> members;
}
