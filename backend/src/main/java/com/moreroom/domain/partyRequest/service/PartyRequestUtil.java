package com.moreroom.domain.partyRequest.service;

import com.moreroom.domain.deviceToken.dto.FcmMessageDto;
import com.moreroom.domain.deviceToken.service.FcmService;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.partyRequest.entity.MatchingStatus;
import com.moreroom.domain.partyRequest.repository.PartyRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PartyRequestUtil {

    private final PartyRequestRepository partyRequestRepository;
    private final FcmService fcmService;

    // 파티 깨진 경우
    // 쿼리 보내는 횟수 최적화
    @Transactional
    public void partyBroke(String uuid) {
        //join 이용해 회원 정보와 디바이스 토큰 한꺼번에 조회
        List<Object[]> memberInfos = partyRequestRepository.findMemberAndDeviceTokenByUuid(uuid);
        //벌크 업데이트 - 상태와 UUID 한 번에 변경
        partyRequestRepository.updateStatusAndUuidByUuid(MatchingStatus.NOT_MATCHED, null, uuid);

        for (Object[] info : memberInfos) {
            Member member = (Member) info[0];
            String deviceToken = (String) info[1];
            //파티 실패 알림
            FcmMessageDto fcmMessageDto = fcmService.makePartyFailedMessage(member, deviceToken);
            fcmService.sendMessageTo(fcmMessageDto);
        }
    }
}
