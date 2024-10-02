package com.moreroom.global.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.auth.oauth2.GoogleCredentials;
import com.moreroom.global.dto.FcmMessageDto;
import com.moreroom.global.dto.FcmMessageDto.Message;
import com.moreroom.global.dto.FcmMessageDto.Notification;
import com.moreroom.global.dto.FcmSendDto;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
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
public class FcmServiceImpl implements FcmService {

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
    ResponseEntity<String> response = restTemplate.exchange(API_URL, HttpMethod.POST, entity,
        String.class);

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

}
