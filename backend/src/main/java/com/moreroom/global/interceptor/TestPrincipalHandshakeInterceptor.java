package com.moreroom.global.interceptor;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

@Component
public class TestPrincipalHandshakeInterceptor implements HandshakeInterceptor {

  @Override
  public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
      WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
    //가짜 Authentication 객체 생성
    Authentication fakeAuthentication = new UsernamePasswordAuthenticationToken("hyeonu64@example.org", "1234",
        Collections.emptyList());

    //SecurityContext에 등록
    SecurityContextHolder.getContext().setAuthentication(fakeAuthentication);

    return true;
  }

  @Override
  public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response,
      WebSocketHandler wsHandler, Exception exception) {

  }
}
