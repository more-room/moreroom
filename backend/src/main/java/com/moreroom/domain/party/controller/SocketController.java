package com.moreroom.domain.party.controller;

import com.moreroom.domain.deviceToken.service.FcmService;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.party.dto.ChatMessageDto;
import com.moreroom.domain.party.service.MessageService;
import com.moreroom.domain.party.service.PartyService;
import com.moreroom.global.dto.SocketNotificationDto;
import com.moreroom.global.util.FindMemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;

// /app으로 시작하는 토픽으로 오는 메세지 처리
@Controller
@RequiredArgsConstructor
@Slf4j
public class SocketController {

  private final SimpMessagingTemplate simpMessagingTemplate;
  private final FindMemberService findMemberService;
  private final PartyService partyService;
  private final MessageService messageService;
  private final FcmService fcmService;

  @MessageMapping("/chat/join")
  public void joinChatroom(SocketNotificationDto dto, Principal principal) {
    Member member = findMemberService.findCurrentMember(principal);
    String welcome = partyService.makeWelcomeMessage(dto.getPartyId(), member);
    simpMessagingTemplate.convertAndSend("/topic/party/" + dto.getPartyId(), welcome);
  }

  @MessageMapping("/chat/message")
  public void sendMessage(ChatMessageDto message, Principal principal, MessageHeaders headers, @Header("nickname") String nickname) {
    //1. 메시지 저장
    messageService.saveMessage(message, principal);
    //2. 푸시 알림 전송 (비동기)
    fcmService.sendChattingMessagePushAlarmAsync(principal.getName(), message.getPartyId(), nickname, message.getMessage())
                    .thenRun(() -> log.debug("푸시 알림 전송 완료"))
                    .exceptionally(ex -> {
                      log.error("푸시 알림 전송 실패", ex);
                      return null;
                    });
    //3. 소켓 메시지 전송
    simpMessagingTemplate.convertAndSend("/topic/party/" + message.getPartyId(), message, headers);
  }
}
