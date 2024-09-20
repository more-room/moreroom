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
      //멤버의 Authentication 정보를 웹소켓 세션의 사용자 정보로 설정
//      Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); //실제 배포시 풀기

      //--------------------개발상 편의 위해 생성-----------------------
      Authentication authentication = new UsernamePasswordAuthenticationToken(
          "jimin49@example.com", "12345",
          Arrays.asList(new SimpleGrantedAuthority("ROLE_USER"))
      );
      //-----------------개발 끝나면 지워야-----------------------------

      if (authentication != null) {
        log.info("AUTHENTICATED");
        accessor.setUser(authentication);
      } else {
        log.warn("NO AUTHENTICATION");
        return null;
      }
    }

    //DISCONNECT가 아닌 모든 Message에 대해
    if (!StompCommand.DISCONNECT.equals(accessor.getCommand())) {
      log.info("MESSAGES");
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
