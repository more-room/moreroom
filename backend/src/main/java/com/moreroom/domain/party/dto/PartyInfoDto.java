package com.moreroom.domain.party.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.moreroom.domain.partyRequest.dto.HashTagsDto;
import com.moreroom.domain.theme.dto.response.ThemeListResponseDto.ThemeListComponentDto;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PartyInfoDto {
  private Long partyId;
  private String roomName;
  private ThemeListComponentDto theme; //넣을 예정
  private String date;
  private Integer memberCount; //못넣음
  private Integer maxMember;
  private List<HashTagsDto> hashtags;

  public void setTheme(ThemeListComponentDto theme) {
    this.theme = theme;
  }

  public void setMemberCount(Integer memberCount) {
    this.memberCount = memberCount;
  }

  public void setHashtags(List<HashTagsDto> hashtags) {
    this.hashtags = hashtags;
  }
}
