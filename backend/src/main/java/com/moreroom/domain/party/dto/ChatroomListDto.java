package com.moreroom.domain.party.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatroomListDto {
  private List<PartyInfoDto> partyList;
  private boolean hasMore;
  private Long lastPartyId;
}
