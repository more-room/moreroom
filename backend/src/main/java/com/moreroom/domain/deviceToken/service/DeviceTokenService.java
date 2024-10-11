package com.moreroom.domain.deviceToken.service;

import com.moreroom.domain.deviceToken.entity.DeviceToken;
import com.moreroom.domain.deviceToken.repository.DeviceTokenRepository;
import com.moreroom.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DeviceTokenService {

  private final DeviceTokenRepository deviceTokenRepository;

  @Transactional
  public void saveToken(String token, Member member) {
    DeviceToken deviceToken = deviceTokenRepository.findByMember(member)
        .orElseGet(() -> DeviceToken.builder()
            .member(member)
            .token(token)
            .build());
    if (deviceToken.getTokenId() == null) {
      deviceTokenRepository.save(deviceToken);
    } else {
      deviceToken.updateToken(token);
    }
  }

}
