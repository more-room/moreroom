package com.moreroom.global.service;

import com.moreroom.global.dto.FcmSendDto;
import java.io.IOException;
import org.springframework.stereotype.Service;

@Service
public interface FcmService {
  int sendMessageTo(FcmSendDto fcmSendDto) throws IOException;
}
