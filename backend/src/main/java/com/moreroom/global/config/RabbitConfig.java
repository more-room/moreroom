package com.moreroom.global.config;

import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
//@EnableRabbit
public class RabbitConfig {

  /* exchange - binding key - queue */
  private static final String CHAT_EXCHANGE_NAME = "chat.exchange";
  private static final String ROUTING_KEY = "recipient.*";
  private static final String CHAT_QUEUE_NAME = "chat.queue";

  @Value("${spring.rabbitmq.username}")
  private String rabbitUser;

  @Value("${spring.rabbitmq.password}")
  private String rabbitPassword;

  @Value("${spring.rabbitmq.host}")
  private String rabbitHost;

  @Value("${spring.rabbitmq.port}")
  private int rabbitPort;

  //Queue 등록 -> 여러 큐를 생성할 수 있지만 여기에서는 큐를 하나만 생성
  @Bean
  public Queue queue() {
    return new Queue(CHAT_QUEUE_NAME, true);
  }

  //Exchange 등록. 발행된 메시지는 exchange로 전달됨. exchange는 정해진 규칙에 따라 큐로 메시지 라우팅
  @Bean
  public TopicExchange exchange() {
    return new TopicExchange(CHAT_EXCHANGE_NAME);
  }

  //Exchange와 Queue 바인딩 -> recipient.* 패턴의 키를 사용해 exchange와 queue 바인딩
  @Bean
  public Binding binding(Queue queue, TopicExchange exchange) {
    return BindingBuilder.bind(queue).to(exchange).with(ROUTING_KEY);
  }

  /* messageConverter를 커스터마이징하기 위해 Bean 새로 등록 */
  // rabbitTemplate는 메시지를 발행할 때 사용하는 높은 수준의 추상화 클래스
  @Bean
  public RabbitTemplate rabbitTemplate() {
    //connectionFactory를 설정하여 rabbitMQ 서버와의 연결 관리
    RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory());//cachingConnectionFactory 사용
    rabbitTemplate.setMessageConverter(jsonMessageConverter()); //jsonMessageConverter을 사용해 java객체와 메시지 변환 처리
    rabbitTemplate.setRoutingKey(CHAT_QUEUE_NAME); //routingKey를 설정해 메시지를 어느 큐로 보낼지 지정
    return rabbitTemplate;
  }


  // 메시지를 수신하는 역할
  @Bean
  public SimpleMessageListenerContainer container() {
    SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();
    container.setConnectionFactory(connectionFactory()); //connectionFactory를 설정해 rabbitmq 서버와의 연결 관리
    container.setQueueNames(CHAT_QUEUE_NAME); // queueNames를 설정하여 어떤 큐에서 메시지를 받을지 지정
    container.setMessageListener(null); //메시지를 받았을 때 어떤 동작을 할지 정함 -> null로 설정되어 있어 실제 구현 필요
    return container;
  }


  // 기본값인 SimpleConnectionFactory 대신 CachingConnectionFactory 사용
  @Bean
  public ConnectionFactory connectionFactory() {
    CachingConnectionFactory factory = new CachingConnectionFactory();
    factory.setHost(rabbitHost);
    factory.setUsername(rabbitUser);
    factory.setPassword(rabbitPassword);
    factory.setPort(rabbitPort);
    return factory;
  }

  // rabbitmq는 바이트 배열로 메시지를 주고받음. json 형식 메시지를 주고받기 위해 컨버터 등록
  @Bean
  public Jackson2JsonMessageConverter jsonMessageConverter() {
    //LocalDateTime serializable 위해
    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, true);
    objectMapper.registerModule(dateTimeModule());

    return new Jackson2JsonMessageConverter(objectMapper);
  }

  @Bean
  public Module dateTimeModule() {
    return new JavaTimeModule();
  }


}
