package com.moreroom.domain.party.controller;

import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.party.dto.ChatMessageDto;
import com.moreroom.domain.party.entity.PartyMessage;
import com.moreroom.domain.party.service.MessageService;
import com.moreroom.domain.party.service.PartyService;
import com.moreroom.global.dto.SocketNotificationDto;
import com.moreroom.global.util.FindMemberService;
import java.security.Principal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Controller;

// /app으로 시작하는 토픽으로 오는 메세지 처리
@Controller
@RequiredArgsConstructor
@Slf4j
public class SocketController {

  private final SimpMessagingTemplate simpMessagingTemplate;
  private final FindMemberService findMemberService;
  private final PartyService partyService;
  private final MessageService messageService;

  @MessageMapping("/chat/join")
  public void joinChatroom(SocketNotificationDto dto, Principal principal) {
    Member member = findMemberService.findCurrentMember(principal);
    String welcome = partyService.makeWelcomeMessage(dto.getPartyId(), member);
    simpMessagingTemplate.convertAndSend("/topic/party/" + dto.getPartyId(), welcome);
  }

  @MessageMapping("/chat/message")
  public void sendMessage(ChatMessageDto message, Principal principal, MessageHeaders headers) {
    ChatMessageDto partyMessage = messageService.saveMessage(message, principal);
    simpMessagingTemplate.convertAndSend("/topic/party/" + message.getPartyId(), partyMessage, headers);
  }
}
