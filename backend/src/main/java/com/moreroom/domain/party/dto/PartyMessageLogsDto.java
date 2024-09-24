package com.moreroom.domain.party.dto;

import com.moreroom.domain.party.entity.PartyMessage;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class PartyMessageLogsDto {
  private List<MessageConvertDto> messageList;
  private String lastMessageId;
}
