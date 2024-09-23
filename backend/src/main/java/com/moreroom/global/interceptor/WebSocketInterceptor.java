package com.moreroom.global.interceptor;

import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.member.exception.MemberNotFoundException;
import com.moreroom.domain.member.repository.MemberRepository;
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
  private final AuthenticationManager authenticationManager;

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
      String[] userInfo = setNicknameAndPhoto(email);

      //헤더에 닉네임, 프사 저장
      accessor.setNativeHeader("nickname", userInfo[0]);
      accessor.setNativeHeader("photo", userInfo[1]);
      log.info("nickname: {}, photo: {}", userInfo[0], userInfo[1]);
    }

    // 로그용
    if (StompCommand.SUBSCRIBE.equals(accessor.getCommand())) {
      log.info("SUBSCRIBED CHANNEL: {}, SESSION USER INFO: {}", accessor.getDestination(), accessor.getUser().getName());
    }

    return message;
  }

  private String[] setNicknameAndPhoto(String email) {
    String nicknameKey = "nickname:" + email;
    String photoKey = "photo:" + email;

    String nickname = redisUtil.getData(nicknameKey);
    String photo = redisUtil.getData(photoKey);

    if (nickname == null && photo == null) {
      Member member = memberRepository.findByEmail(email)
          .orElseThrow(MemberNotFoundException::new);
      nickname = member.getNickname();
      photo = member.getPhoto();
      redisUtil.setDataExpire(nicknameKey, nickname, 3600);
      redisUtil.setDataExpire(photoKey, photo, 3600);
    }

    return new String[]{nickname, photo};
  }

}
