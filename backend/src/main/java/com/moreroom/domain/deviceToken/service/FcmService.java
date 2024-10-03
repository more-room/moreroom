package com.moreroom.domain.deviceToken.service;

import com.moreroom.domain.deviceToken.dto.FcmMessageDto;
import java.io.IOException;
import org.springframework.stereotype.Service;

@Service
public interface FcmService {
  int sendMessageTo(FcmMessageDto fcmMessageDto) throws IOException;
}
