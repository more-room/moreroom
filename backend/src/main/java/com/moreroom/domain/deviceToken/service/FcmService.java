package com.moreroom.domain.deviceToken.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.auth.oauth2.GoogleCredentials;
import com.moreroom.domain.deviceToken.dto.FcmMessageDto;
import com.moreroom.domain.deviceToken.dto.FcmMessageDto.Data;
import com.moreroom.domain.deviceToken.dto.FcmMessageDto.Message;
import com.moreroom.domain.deviceToken.dto.FcmMessageDto.MessageType;
import com.moreroom.domain.deviceToken.dto.FcmMessageDto.Notification;
import com.moreroom.domain.deviceToken.exception.DeviceTokenNotFoundException;
import com.moreroom.domain.deviceToken.repository.DeviceTokenRepository;
import com.moreroom.domain.mapping.member.repository.MemberPartyMappingRepository;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.theme.entity.Theme;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.*;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
@Slf4j
public class FcmService {

  private final DeviceTokenRepository deviceTokenRepository;
  private final MemberPartyMappingRepository memberPartyMappingRepository;
  private final WebClient webClient;

  public int sendMessageTo(FcmMessageDto fcmMessageDto) {
    try {
      String message = makeMessage(fcmMessageDto);
      RestTemplate restTemplate = new RestTemplate();

      restTemplate.getMessageConverters()
          .add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8));

      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_JSON);
      headers.set("Authorization", "Bearer " + getAccessToken());

      HttpEntity<String> entity = new HttpEntity<>(message, headers);

      String API_URL = "https://fcm.googleapis.com/v1/projects/d206-moreroom/messages:send";
      ResponseEntity<String> response = restTemplate.exchange(API_URL, HttpMethod.POST, entity, String.class);
      log.info("fcm response: {}", response);
//      log.info("알림보내기: {}", response.getStatusCode());

      return response.getStatusCode() == HttpStatus.OK ? 1 : 0;
    } catch (IOException e) {
//      log.error("access token 발급 실패");
    } catch (Exception e) {
//      log.error("해당 계정에 deviceToken이 없거나 올바르게 구성되지 않은 토큰임: {}", fcmMessageDto.getMessage().getToken());
    }
      return 0;
  }

  public Mono<String> sendMessageToAsync(FcmMessageDto fcmMessageDto) {
    return Mono.fromCallable(() -> makeMessage(fcmMessageDto))
            .zipWith(Mono.fromCallable(this::getAccessToken))
            .flatMap(tuple -> {
              String message = tuple.getT1();
              String token = tuple.getT2();

              return webClient.post()
                      .header("Authorization", "Bearer " + token)
                      .contentType(MediaType.APPLICATION_JSON)
                      .bodyValue(message)
                      .retrieve()
                      .bodyToMono(String.class)
                      .doOnSuccess(response -> log.info("Async 알림보내기 성공: {}", response))
                      .doOnError(error -> log.error("Async 알림보내기 실패", error));
            })
            .onErrorResume(e -> {
              log.error("메시지 전송 준비 중 오류 발생", e);
              return Mono.error(e);
            });
  }


  /**
   * Firebase Admin SDK의 비공개키를 참조하여 Bearer 토큰 발급
   * @return Bearer token
   * @throws IOException
   */
  private String getAccessToken() throws IOException {
    String firebaseConfigPath = "firebase/d206-moreroom-firebase-adminsdk-byl7s-8676046b0a.json";
    InputStream inputStream = getClass().getClassLoader().getResourceAsStream(firebaseConfigPath);
//    try {
//      inputStream = new ClassPathResource(firebaseConfigPath).getInputStream();
//      log.info("firebase json파일 열기 성공");
//    } catch (IOException e) {
//      log.info("IOException 또는 FileNotFoundException 발생", e);
//    }
    if (inputStream == null) {
      log.info("inputStream이 null");
      return null;
    }
//    log.info("googleCredentials 진입 전");
    GoogleCredentials googleCredentials = GoogleCredentials
        .fromStream(inputStream)
        .createScoped(List.of("https://www.googleapis.com/auth/cloud-platform"));
    inputStream.close();
    googleCredentials.refreshIfExpired();
//    log.info("액세스 토큰: {}", googleCredentials.getAccessToken().getTokenValue());
    return googleCredentials.getAccessToken().getTokenValue();
  }

  private String makeMessage(FcmMessageDto fcmMessageDto) throws JsonProcessingException {
    ObjectMapper om = new ObjectMapper();
    return om.writeValueAsString(fcmMessageDto);
  }

  public FcmMessageDto makePartyRequestMessage(Member member, String themeTitle, String cafeName, Long partyRequestId, String uuid, Integer themeId) {
    Notification notification = Notification.builder()
        .title("파티 매칭 알림")
        .body("[" + themeTitle + "] 파티가 매칭되었습니다. 참가해보세요!")
        .build();

    Data data = Data.builder()
        .type(MessageType.PARTY_REQUEST.toString())
        .themeName(themeTitle)
        .cafeName(cafeName)
        .partyRequestId(partyRequestId.toString())
        .uuid(uuid)
        .themeId(themeId.toString())
        .build();

    return FcmMessageDto.builder()
        .validateOnly(false)
        .message(Message.builder()
            .token(getDeviceToken(member))
            .notification(notification)
            .data(data)
            .build())
        .build();
  }

  public FcmMessageDto makeChatroomSubscribeMessage(Long partyId, Theme theme, Member member) {
    Notification notification = Notification.builder()
        .title("["+theme.getTitle()+"] 파티 확정!")
        .body("파티 채팅방에 입장했어요. 확인해보세요!")
        .build();

    Data data = Data.builder()
        .type(MessageType.CHATROOM_SUBSCRIBE.toString())
        .partyId(partyId.toString())
        .build();

    return FcmMessageDto.builder()
        .validateOnly(false)
        .message(Message.builder()
            .token(getDeviceToken(member))
            .notification(notification)
            .data(data)
            .build())
        .build();
  }

  public FcmMessageDto makePartyFailedMessage(Member member, String deviceToken) {
    Notification notification = Notification.builder()
        .title("파티 결성 실패!")
        .body("파티 결성에 실패했습니다😥")
        .build();

    Data data = Data.builder()
        .type(MessageType.PARTY_BROKEN.toString())
        .message("파티가 매칭되지 않았습니다.")
        .build();

    return FcmMessageDto.builder()
        .validateOnly(false)
        .message(Message.builder()
            .token(deviceToken)
            .notification(notification)
            .data(data)
            .build())
        .build();
  }

  private String getDeviceToken(Member member) {
    return deviceTokenRepository.findByMember(member) //mysql에서 가져오기
            .orElseThrow(DeviceTokenNotFoundException::new)
            .getToken();
  }

  public String getDeviceToken(String email) {
    return deviceTokenRepository.findByEmail(email) //mysql에서 가져오기
            .orElseThrow(DeviceTokenNotFoundException::new)
            .getToken();
  }

  public FcmMessageDto makeChattingPush(String nickname, String message, String email, Long partyId) {
    Notification notification = Notification.builder()
        .title(nickname)
        .body(message)
        .build();

    Data data = Data.builder()
        .type(MessageType.CHAT_MESSAGE.toString())
        .partyId(partyId.toString())
        .build();

    return FcmMessageDto.builder()
        .validateOnly(false)
        .message(Message.builder()
            .token(getDeviceToken(email))
            .notification(notification)
            .data(data)
            .build())
        .build();
  }

  //푸시알림 전송 : 발신자를 제외한 파티원에게 전송
  public void sendChattingMessagePushAlarm(String email, Long partyId, String senderNickname, String message) {
    try {
      log.info("채팅 알림 전송 로직 진입: {}이 보낸 채팅 알림 전송", email);
      List<String> emailList = memberPartyMappingRepository.getEmailListForChattingAlarm(partyId, email);
      for (String emailAddress : emailList) {
        try {
          FcmMessageDto fcmMessageDto = makeChattingPush(senderNickname, message, emailAddress, partyId);
          int result = sendMessageTo(fcmMessageDto);
          log.info("{}에게 푸시 알림 보냄 - 전송 결과: {}", emailAddress, result == 1 ? "SUCCESS" : "FAIL");
        } catch (Exception e) {
          log.error("푸시 알람 전송 실패: to {}", emailAddress);
        }
      }
    } catch (Exception e) {
      log.error("푸시 알림 로직 실패");
    }
  }

  //채팅 푸시알림 전송 - 비동기 도입
  @Async
  public CompletableFuture<Void> sendChattingMessagePushAlarmAsync(String email, Long partyId, String senderNickname, String message) {
    return CompletableFuture.runAsync(() -> {
      log.info("비동기 푸시 알림 전송 시작: email={}, partyId={}, sender={}", email, partyId, senderNickname);
      List<String> emailList = memberPartyMappingRepository.getEmailListForChattingAlarm(partyId, email);
      log.info("알림 대상 이메일 목록: {}", emailList);

      Flux.fromIterable(emailList)
              .flatMap(emailAddress -> {
                log.info("{}에게 푸시 알림 생성 중", emailAddress);
                FcmMessageDto fcmMessageDto = makeChattingPush(senderNickname, message, emailAddress, partyId);
                log.info("생성된 FCM 메시지: {}", fcmMessageDto);
                return sendMessageToAsync(fcmMessageDto)
                        .doOnSuccess(result -> log.info("{}에게 푸시 알림 보냄 - 전송 성공", emailAddress))
                        .doOnError(error -> log.error("{}에게 푸시 알림 보냄 - 전송 실패", emailAddress, error))
                        .onErrorResume(e -> Mono.empty());
              })
              .collectList()
              .block();

      log.info("비동기 푸시 알림 전송 완료");
    });
  }

}
