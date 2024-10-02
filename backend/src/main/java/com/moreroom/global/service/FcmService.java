package com.moreroom.global.service;

import com.moreroom.global.dto.FcmMessageDto;
import java.io.IOException;
import org.springframework.stereotype.Service;

@Service
public interface FcmService {
  int sendMessageTo(FcmMessageDto fcmMessageDto) throws IOException;
}
