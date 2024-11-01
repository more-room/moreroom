package com.moreroom.domain.partyRequest.dto;

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
public class MemberDto {
  private Long memberId;
  private String nickname;
  private String photo;
  private List<HashTagsDto> memberHashtag;
}
