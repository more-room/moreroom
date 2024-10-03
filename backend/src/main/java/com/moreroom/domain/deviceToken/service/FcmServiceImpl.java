package com.moreroom.domain.deviceToken.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.auth.oauth2.GoogleCredentials;
import com.moreroom.domain.deviceToken.entity.DeviceToken;
import com.moreroom.domain.deviceToken.exception.DeviceTokenNotFoundException;
import com.moreroom.domain.deviceToken.repository.DeviceTokenRepository;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.theme.entity.Theme;
import com.moreroom.domain.deviceToken.dto.FcmMessageDto;
import com.moreroom.domain.deviceToken.dto.FcmMessageDto.Data;
import com.moreroom.domain.deviceToken.dto.FcmMessageDto.Message;
import com.moreroom.domain.deviceToken.dto.FcmMessageDto.MessageType;
import com.moreroom.domain.deviceToken.dto.FcmMessageDto.Notification;
import com.moreroom.global.util.RedisUtil;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Slf4j
public class FcmServiceImpl implements FcmService {

  private final DeviceTokenRepository deviceTokenRepository;
  private final RedisUtil redisUtil;

  @Override
  public int sendMessageTo(FcmMessageDto fcmMessageDto) throws IOException {
    String message = makeMessage(fcmMessageDto);
    RestTemplate restTemplate = new RestTemplate();

    restTemplate.getMessageConverters()
        .add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8));

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    headers.set("Authorization", "Bearer " + getAccessToken());

    HttpEntity<String> entity = new HttpEntity<>(message, headers);

    String API_URL = "<https://fcm.googleapis.com/v1/projects/d206-moreroom/messages:send>";
    ResponseEntity<String> response = restTemplate.exchange(API_URL, HttpMethod.POST, entity, String.class);

    System.out.println(response.getStatusCode());

    return response.getStatusCode() == HttpStatus.OK ? 1 : 0;
  }

  /**
   * Firebase Admin SDK의 비공개키를 참조하여 Bearer 토큰 발급
   * @return Bearer token
   * @throws IOException
   */
  private String getAccessToken() throws IOException {
    String firebaseConfigPath = "firebase/d206-moreroom-firebase-adminsdk-byl7s-3637b87df4.json";

    GoogleCredentials googleCredentials = GoogleCredentials
        .fromStream(new ClassPathResource(firebaseConfigPath).getInputStream())
        .createScoped(List.of("<https://www.googleapis.com/auth/cloud-platform>"));

    googleCredentials.refreshIfExpired();
    return googleCredentials.getAccessToken().getTokenValue();
  }

  private String makeMessage(FcmMessageDto fcmMessageDto) throws JsonProcessingException {
    ObjectMapper om = new ObjectMapper();
    return om.writeValueAsString(fcmMessageDto);
  }

  public FcmMessageDto makePartyRequestMessage(Member member, String themeTitle, String cafeName, Long partyRequestId, String uuid, Integer themeId) {
    Notification notification = Notification.builder()
        .title("파티 매칭 알림")
        .body("[" + themeTitle + "] 파티가 매칭되었습니다.")
        .build();

    Data data = Data.builder()
        .type(MessageType.PARTY_REQUEST)
        .themeName(themeTitle)
        .cafeName(cafeName)
        .partyRequestId(partyRequestId)
        .uuid(uuid)
        .themeId(themeId)
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
        .type(MessageType.CHATROOM_SUBSCRIBE)
        .partyId(partyId)
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

  public FcmMessageDto makePartyFailedMessage(Member member) {
    Notification notification = Notification.builder()
        .title("파티 결성 실패!")
        .body("파티 결성에 실패했습니다😥")
        .build();

    Data data = Data.builder()
        .type(MessageType.PARTY_BROKEN)
        .message("파티가 매칭되지 않았습니다.")
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

  private String getDeviceToken(Member member) {
    String key = "DeviceToken:" + member.getMemberId();
    String token = redisUtil.getData(key); //레디스에서 가져오기
    if (token == null) { //레디스에 없으면
      DeviceToken deviceToken = deviceTokenRepository.findByMember(member) //mysql에서 가져오기
          .orElseThrow(DeviceTokenNotFoundException::new);
      token = deviceToken.getToken();
      redisUtil.setDataExpire(key, token, 3600); //1시간동안 레디스에 보관
    }
    return token;
  }

}
