package com.moreroom.global.interceptor;

import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.member.exception.MemberNotFoundException;
import com.moreroom.domain.member.repository.MemberRepository;
import java.security.Principal;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Slf4j
@Component
public class WebSocketInterceptor implements ChannelInterceptor {

  private final MemberRepository memberRepository;
  private final RedisTemplate<String, String> redisTemplate;

  @Override
  public Message<?> preSend(Message<?> message, MessageChannel channel) {
    StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

    // CONNECT할 때 : Spring Security의 필터로 사용자 인증
    if (StompCommand.CONNECT.equals(accessor.getCommand())) {
      //멤버의 Authentication 정보를 웹소켓 세션의 사용자 정보로 설정
      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
      if (authentication != null) {
        accessor.setUser(authentication);
      } else {
        return null;
      }
    }

    //DISCONNECT가 아닌 모든 Message에 대해
    if (!StompCommand.DISCONNECT.equals(accessor.getCommand())) {
      //redis에 멤버의 닉네임, 프사 올리기
      String email = accessor.getUser().getName();
      if (email == null) return null;
      String[] userInfo = setNicknameAndPhoto(email);

      //헤더에 닉네임, 프사 저장
      accessor.setNativeHeader("nickname", userInfo[0]);
      accessor.setNativeHeader("photo", userInfo[1]);
    }
    return message;
  }

  private String[] setNicknameAndPhoto(String email) {
    String nicknameKey = "nickname:" + email;
    String photoKey = "photo:" + email;

    String nickname = redisTemplate.opsForValue().get(nicknameKey);
    String photo = redisTemplate.opsForValue().get(photoKey);

    if (nickname == null && photo == null) {
      Member member = memberRepository.findByEmail(email)
          .orElseThrow(MemberNotFoundException::new);
      nickname = member.getNickname();
      photo = member.getPhoto();
      redisTemplate.opsForValue().set(nicknameKey, nickname, 1, TimeUnit.HOURS);
      redisTemplate.opsForValue().set(photoKey, photo, 1, TimeUnit.HOURS);
    }

    return new String[]{nickname, photo};
  }

}
