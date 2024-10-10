package com.moreroom.domain.partyRequest.service;

import com.moreroom.domain.deviceToken.dto.FcmMessageDto;
import com.moreroom.domain.deviceToken.service.FcmService;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.partyRequest.entity.MatchingStatus;
import com.moreroom.domain.partyRequest.repository.PartyRequestRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PartyRequestUtil {

    private final PartyRequestRepository partyRequestRepository;
    private final FcmService fcmService;

    // 파티 깨진 경우
    // 쿼리 보내는 횟수 최적화
    public void partyBroke(String uuid) {
        //join 이용해 회원 정보와 디바이스 토큰 한꺼번에 조회
        List<String> memberInfos = partyRequestRepository.findDeviceTokenByUuid(uuid);
        //벌크 업데이트 - 상태와 UUID 한 번에 변경
        partyRequestRepository.updateStatusAndUuidByUuid(MatchingStatus.NOT_MATCHED, null, uuid);

        for (String deviceToken : memberInfos) {
            if (deviceToken == null) {
                log.info("토큰 등록 안되어있어서 푸시 알림 보내지 않음");
                continue;
            }
            //파티 실패 알림
            try {
                FcmMessageDto fcmMessageDto = fcmService.makePartyFailedMessage(deviceToken);
                fcmService.sendMessageTo(fcmMessageDto);
            } catch (Exception e) {
                log.error("파티 깨짐 푸시알림 전송 오류 발생", e);
            }

        }
    }

    //파티 성립된 경우
    public void partyMade(String uuid) {
        List<String> memberInfos = partyRequestRepository.findDeviceTokenByUuid(uuid);

        for (String deviceToken : memberInfos) {
            if (deviceToken == null) {
                log.info("토큰 등록 안되어있어서 푸시 알림 보내지 않음");
                continue;
            }
            //파티 성립 알림
            try {
                FcmMessageDto fcmMessageDto = fcmService.makePartyMadeMessage(deviceToken);
                fcmService.sendMessageTo(fcmMessageDto);
            } catch (Exception e) {
                log.error("파티 결성 푸시알림 전송 오류 발생", e);
            }

        }
    }
}
