package com.moreroom.global.interceptor;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.member.exception.MemberNotFoundException;
import com.moreroom.domain.member.repository.MemberRepository;
import com.moreroom.global.dto.RedisUserInfo;
import com.moreroom.global.util.RedisUtil;
import java.security.Principal;
import java.util.Arrays;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Slf4j
@Component
public class WebSocketInterceptor implements ChannelInterceptor {

  private final MemberRepository memberRepository;
  private final RedisUtil redisUtil;

  @Override
  public Message<?> preSend(Message<?> message, MessageChannel channel) {
    StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

    // CONNECT할 때 : Spring Security의 필터로 사용자 인증
    if (StompCommand.CONNECT.equals(accessor.getCommand())) {
      log.info("CONNECT");

      String email = accessor.getUser().getName();

      if (email != null) {
        log.info("AUTHENTICATED");
      } else {
        log.warn("NO AUTHENTICATION");
        return null;
      }
    }

    //DISCONNECT가 아닌 모든 Message에 대해
    if (!StompCommand.DISCONNECT.equals(accessor.getCommand())) {
      log.info("COMMAND: {}", accessor.getCommand());
      log.info("SESSION USER: {}", accessor.getUser());
      //redis에 멤버의 닉네임, 프사 올리기
      String email = accessor.getUser().getName();
      if (email == null) {
        log.info("EMAIL IS NULL");
        return null;
      }

      RedisUserInfo userInfo = null;
      try {
        userInfo = setUserInfo(email);
      } catch (JsonProcessingException e) {
        throw new RuntimeException(e);
      }

      //헤더에 닉네임, 프사 저장
      accessor.setNativeHeader("nickname", userInfo.getNickname());
      accessor.setNativeHeader("photo", userInfo.getPhoto());
      log.info("nickname: {}, photo: {}", accessor.getFirstNativeHeader("nickname"), accessor.getFirstNativeHeader("photo"));
    }

    // 로그용
    if (StompCommand.SUBSCRIBE.equals(accessor.getCommand())) {
      log.info("SUBSCRIBED CHANNEL: {}, SESSION USER INFO: {}", accessor.getDestination(), accessor.getUser().getName());
    }

    return MessageBuilder.createMessage(message.getPayload(), accessor.getMessageHeaders());
  }

  private RedisUserInfo setUserInfo(String email) throws JsonProcessingException {
    String key = "USERINFO:" + email;

    RedisUserInfo info = redisUtil.getRedisUserInfo(key);

    if (info == null) {
      Member member = memberRepository.findByEmail(email)
          .orElseThrow(MemberNotFoundException::new);
      info = new RedisUserInfo(member.getMemberId(), member.getNickname(),
          member.getPhoto());
      redisUtil.saveRedisUserInfo(key, info, 7200);
    }

    return info;
  }

}
