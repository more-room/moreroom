package com.moreroom.domain.party.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
public class ChatDto {
  private Long id;
  private Long partyId;
  private Long memberId;

  private String message;
  @JsonDeserialize(using= LocalDateTimeDeserializer.class)
  private LocalDateTime regDate;
}
