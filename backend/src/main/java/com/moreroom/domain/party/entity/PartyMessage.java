package com.moreroom.domain.party.entity;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PartyMessage {

  @Id
  public String id;

  public String email;
  public String message;
  public LocalDateTime time;
  public Long partyId;

}
