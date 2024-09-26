package com.moreroom.domain.partyRequest.service;

import com.moreroom.domain.hashtag.entity.Hashtag;
import com.moreroom.domain.hashtag.repository.HashtagRepository;
import com.moreroom.domain.mapping.partyRequest.entity.PartyRequestHashtagMapping;
import com.moreroom.domain.mapping.partyRequest.repository.PartyRequestHashtagRepository;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.partyRequest.dto.MemberDto;
import com.moreroom.domain.partyRequest.dto.PartyRequestDto;
import com.moreroom.domain.partyRequest.dto.SettingPartyRequestDto;
import com.moreroom.domain.partyRequest.entity.MatchingStatus;
import com.moreroom.domain.partyRequest.entity.PartyRequest;
import com.moreroom.domain.partyRequest.repository.PartyRequestQueryRepository;
import com.moreroom.domain.partyRequest.repository.PartyRequestRepository;
import com.moreroom.domain.theme.entity.Theme;
import com.moreroom.domain.theme.repository.ThemeRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PartyRequestService {

  private final PartyRequestRepository partyRequestRepository;
  private final ThemeRepository themeRepository;
  private final PartyRequestHashtagRepository partyRequestHashtagRepository;
  private final PartyRequestQueryRepository partyRequestQueryRepository;
  private final HashtagRepository hashtagRepository;

  //파티요청 등록
  @Transactional
  public void savePartyRequest(SettingPartyRequestDto partyRequestDto, Member member) {
    Theme theme = themeRepository.getReferenceById(partyRequestDto.getThemeId());
    PartyRequest partyRequest = PartyRequest.builder()
        .member(member)
        .theme(theme)
        .matchingStatus(MatchingStatus.NOT_MATCHED)
        .createdAt(LocalDateTime.now())
        .build();
    partyRequestRepository.save(partyRequest); //파티요청 save

    //파티요청-해시태그 저장
    List<PartyRequestHashtagMapping> list = new ArrayList<>();
    Stream.of(
        partyRequestDto.getPartyHashtagIdList(),
        partyRequestDto.getMyHashtagIdList(),
        partyRequestDto.getYourHashtagIdList()
    )
        .flatMapToInt(Arrays::stream)
        .distinct()
        .forEach(hashtagId -> {
          Hashtag hashtag = hashtagRepository.getReferenceById(hashtagId);
          list.add(new PartyRequestHashtagMapping(partyRequest, hashtag));
        });

    partyRequestHashtagRepository.saveAll(list); //파티요청-해시태그 save
  }

  //파티요청 삭제
  @Transactional
  public void deletePartyRequest(Long partyRequestId) {
    partyRequestRepository.deleteById(partyRequestId);
    partyRequestHashtagRepository.deleteAllByPartyRequestId(partyRequestId);
  }

  //파티요청 활성화/비활성화
  @Transactional
  public void activateOrDeactivatePartyRequest(boolean activate, Long partyRequestId) {
    if (activate) {
      partyRequestRepository.updatePartyRequestStatus(MatchingStatus.NOT_MATCHED, partyRequestId);
    } else {
      partyRequestRepository.updatePartyRequestStatus(MatchingStatus.DISABLED, partyRequestId);
    }
  }

  //파티요청 조회
  public List<PartyRequestDto> getPartyRequestList(Long memberId) {
    //파티요청 조회
    List<PartyRequestDto> partyRequestDtoList = partyRequestQueryRepository.findPartyRequestByMemberId(memberId);
    //status에 member정보 채우기
    for (PartyRequestDto dto : partyRequestDtoList) {
      String status = dto.getStatus().getStatusName();
      Long partyRequestId = dto.getPartyRequestId();
      if (status.equals(MatchingStatus.MATCHED.toString()) || status.equals(MatchingStatus.PENDING.toString())) {
        List<MemberDto> memberHashtagList = partyRequestQueryRepository.getMemberHashtagList(partyRequestId);
        dto.getStatus().setMemberInfo(memberHashtagList);
      }
    }
    return partyRequestDtoList;
  }


}
