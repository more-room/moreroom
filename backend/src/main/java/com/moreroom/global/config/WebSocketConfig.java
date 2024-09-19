package com.moreroom.global.config;

import lombok.RequiredArgsConstructor;
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
    registry.setPathMatcher(new AntPathMatcher(".")); //url을 chat/room/3 -> chat.room.3로 참조하기 위한 설정
    registry.setApplicationDestinationPrefixes("/pub"); //Handler 거쳐서 가공 후 구독자에게 전송
    registry.enableStompBrokerRelay("/queue", "/topic", "/exchange", "/amq/queue"); //stomp borker relay 활성화. rabbitmq 연동 위한 설정
    // /queue, /topic, /exchange, /amq/queue로 시작하는 목적지로 메세지 발행하면 이 메세지들은 외부 STOMP 브로커로 전달
  }

  /**
   * registers the `/ws` endpoint for websocket connections.
   */
  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/ws")  //ws://localhost:8081/ws 에서 웹소켓 연결
        .setAllowedOriginPatterns("*");
  }

  //클라이언트에게 오는 메세지 처리
  @Override
  public void configureClientInboundChannel(ChannelRegistration registration) {
    WebSocketMessageBrokerConfigurer.super.configureClientInboundChannel(registration);
  }
}
