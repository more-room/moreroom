package com.moreroom.domain.party.service;

import com.moreroom.domain.party.dto.ChatMessageDto;
import com.moreroom.domain.party.entity.PartyMessage;
import com.moreroom.domain.party.repository.PartyMessageRepository;
import java.security.Principal;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageService {

  private final PartyMessageRepository partyMessageRepository;

  public void saveMessage(ChatMessageDto message, Principal principal) {
    PartyMessage partyMessage = PartyMessage.builder()
        .email(principal.getName())
        .message(message.getMessage())
        .time(LocalDateTime.now())
        .partyId(message.getPartyId())
        .build();

    partyMessageRepository.save(partyMessage);
  }
}
