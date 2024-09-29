package com.moreroom.domain.party.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ChatroomSettingDto {
  private Long partyId;
  private String roomName;
  private Integer themeId;
  private String date;
  private int maxMember;
  private boolean addFlag;
}
