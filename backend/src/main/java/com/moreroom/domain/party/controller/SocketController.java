package com.moreroom.domain.party.controller;

import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.party.service.PartyService;
import com.moreroom.global.dto.SocketNotificationDto;
import com.moreroom.global.util.FindMemberService;
import java.security.Principal;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class SocketController {

  private final SimpMessagingTemplate simpMessagingTemplate;
  private final FindMemberService findMemberService;
  private final PartyService partyService;

  @SubscribeMapping("/topic/party/{partyId}")
  public void joinChatroom(@DestinationVariable String partyId, Principal principal) {
    Member member = findMemberService.findCurrentMember(principal);
    String message = partyService.makeWelcomeMessage(partyId, member);
    simpMessagingTemplate.convertAndSend("/topic/party/" + partyId, message);
  }

}
