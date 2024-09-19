package com.moreroom.global.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
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
    registry.enableSimpleBroker("/topic"); //SimpleBroker 거쳐서 바로 구독자에게 전송
    registry.setApplicationDestinationPrefixes("/app"); //Handler 거쳐서 가공 후 구독자에게 전송
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
