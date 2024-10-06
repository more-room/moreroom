package com.moreroom.domain.partyRequest.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.moreroom.domain.member.dto.request.HashtagDTO;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PartyRequestDto {
  private Long partyRequestId; //이거
  private Integer acceptedMemberCnt;
  private StatusDto status;
  private ThemeDto theme;
  private String createdAt;
  private List<HashTagsDto> partyHashtagList;
  private List<HashTagsDto> myHashtagList;
  private List<HashTagsDto> yourHashtagList;

  public void setMemberCnt(int cnt) {
    this.acceptedMemberCnt = cnt;
  }

}
