package com.moreroom.global.config;

import com.moreroom.global.interceptor.TestPrincipalHandshakeInterceptor;
import com.moreroom.global.interceptor.WebSocketInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

  private final WebSocketInterceptor webSocketInterceptor;
  private final TestPrincipalHandshakeInterceptor testPrincipalHandshakeInterceptor;

  /**
   * enable a simple memory-based message broker
   * to carry the greeting messages back to the client
   * on destinations prefixed with `/topic`. designates
   * the `/app` prefix for messages that are bound for
   * methods annotated with @MessageMapping.
   * This prefix will be used to define all the message mappings.
   */
  @Override
  public void configureMessageBroker(MessageBrokerRegistry registry) {
    //topic: 구독한 모든사람에게 전송, /queue: 한명에게만 전송
    registry.enableSimpleBroker("/topic", "/queue"); //SimpleBroker 거쳐서 바로 구독자에게 전송
    registry.setApplicationDestinationPrefixes("/app"); //Handler 거쳐서 가공 후 구독자에게 전송
    registry.setUserDestinationPrefix("/user"); // 특정 유저에게만 메세지 보내기 위해 설정 (convertAndSendToUser 사용 위함)
  }

  /**
   * registers the `/ws` endpoint for websocket connections.
   */
  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/ws")  //ws://localhost:8081/api/ws 에서 웹소켓 연결
//        .addInterceptors(testPrincipalHandshakeInterceptor)
        .setAllowedOriginPatterns("*");
  }

  //클라이언트에게 오는 메세지 처리
  @Override
  public void configureClientInboundChannel(ChannelRegistration registration) {
    //ChannelRegistration에 ChannelInterceptor을 상속받아서 preSend를 구현한 후 인터셉터로 등록
    registration.interceptors(webSocketInterceptor);
  }
}
