package com.moreroom.domain.partyRequest.service;

import com.moreroom.domain.partyRequest.dto.MockDto;
import com.moreroom.domain.partyRequest.entity.PartyRequest;
import com.moreroom.domain.partyRequest.repository.PartyRequestRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PartyRequestService {

  private final PartyRequestRepository partyRequestRepository;

  //시연용 함수
  public List<MockDto> getPartyRequestList(Long memberId) {
    List<PartyRequest> allByMemberId = partyRequestRepository.findAllByMemberId(memberId);
    return allByMemberId.stream()
        .map(a -> MockDto.builder()
            .partyRequestId(a.getPartyRequestId())
            .memberId(a.getMember().getMemberId())
            .themeId(a.getTheme().getThemeId())
            .createdAt(a.getCreatedAt())
            .matchingStatus(a.getMatchingStatus().toString())
            .uuid(a.getRedisUuid())
            .build()
        ).toList();
  }

  //파티요청 목록 조회

}
