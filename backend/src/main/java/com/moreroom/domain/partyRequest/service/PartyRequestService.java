package com.moreroom.domain.partyRequest.service;

import com.fasterxml.jackson.core.JsonProcessingException;
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
import com.moreroom.domain.partyRequest.exception.PartyRequestNotFoundException;
import com.moreroom.domain.partyRequest.repository.PartyRequestQueryRepository;
import com.moreroom.domain.partyRequest.repository.PartyRequestRepository;
import com.moreroom.domain.theme.entity.Theme;
import com.moreroom.domain.theme.exception.ThemeNotFoundException;
import com.moreroom.domain.theme.repository.ThemeRepository;
import java.time.LocalDateTime;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.moreroom.global.exception.globalException.JsonSerializationException;
import com.moreroom.global.util.RedisUtil;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class PartyRequestService {

  private final PartyRequestRepository partyRequestRepository;
  private final ThemeRepository themeRepository;
  private final PartyRequestHashtagRepository partyRequestHashtagRepository;
  private final PartyRequestQueryRepository partyRequestQueryRepository;
  private final HashtagRepository hashtagRepository;
  private final RedisUtil redisUtil;
  private final PartyRequestUtil partyRequestUtil;

  //파티요청 등록
  @Transactional
  public void savePartyRequest(SettingPartyRequestDto partyRequestDto, Member member) {
    Theme theme;
    try {
      theme = themeRepository.getReferenceById(partyRequestDto.getThemeId());
    } catch (EntityNotFoundException e) {
      log.error("themeId {}를 조회할 수 없음", partyRequestDto.getThemeId(), e);
      throw new ThemeNotFoundException();
    }
    PartyRequest partyRequest = PartyRequest.builder()
        .member(member)
        .theme(theme)
        .matchingStatus(MatchingStatus.NOT_MATCHED)
        .createdAt(LocalDateTime.now())
        .build();
    partyRequestRepository.save(partyRequest); //파티요청 save

    //파티요청-해시태그 저장
    updatePartyRequestHashtags(partyRequest, partyRequestDto);
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
    Map<Long, PartyRequest> partyRequestMap = partyRequestRepository.findAllByMemberId(memberId).stream()
            .collect(Collectors.toMap(PartyRequest::getPartyRequestId, item -> item));


    //status에 member정보 채우기
    for (PartyRequestDto dto : partyRequestDtoList) {
      String status = dto.getStatus().getStatusName();
      Long partyRequestId = dto.getPartyRequestId();

      // 파티 매칭 후 최종 결성 대기중인 상태
      if (status.equals(MatchingStatus.MATCHED.toString()) || status.equals(MatchingStatus.PENDING.toString())) {
        List<MemberDto> memberHashtagList = partyRequestQueryRepository.getMemberHashtagList(partyRequestId);
        dto.getStatus().setMemberInfo(memberHashtagList);

        //매칭을 수락한 사람들의 수
        PartyRequest partyRequest = partyRequestMap.get(partyRequestId);
        String key = "PARTYMATCH:" + partyRequest.getRedisUuid();
        try {
          HashMap<Long, String> partyAcceptRecordMap = redisUtil.getLongStringHashMap(key); //레디스에서 기록 가져옴

          if (partyAcceptRecordMap != null) {
            int cnt = Integer.parseInt(partyAcceptRecordMap.get(-2L)); //파티 참가한 사람 수
            dto.setMemberCnt(cnt); //dto에 정보 넣기
          }
        } catch (JsonProcessingException e) {
          e.printStackTrace();
          throw new JsonSerializationException();
        }
      }
    }
    return partyRequestDtoList;
  }

  //파티요청 세팅 수정
  @Transactional
  public void updatePartyRequestSettings(Long partyRequestId, SettingPartyRequestDto partyRequestDto) {
    PartyRequest partyRequest = partyRequestRepository.findById(partyRequestId).orElseThrow(PartyRequestNotFoundException::new);

    //테마가 바뀐 경우 테마 업데이트
    if (!partyRequest.getTheme().getThemeId().equals(partyRequestDto.getThemeId())) {
      Theme theme = themeRepository.findById(partyRequestDto.getThemeId()).orElseThrow(ThemeNotFoundException::new);
      partyRequest.updateTheme(theme);
    }

    //해시태그 업데이트
    partyRequestHashtagRepository.deleteAllByPartyRequestId(partyRequestId);
    updatePartyRequestHashtags(partyRequest, partyRequestDto);
  }

  private void updatePartyRequestHashtags(PartyRequest partyRequest, SettingPartyRequestDto partyRequestDto) {

    String yourHashtagList = makeHashtagType(partyRequestDto.getYourHashtagIdList());

    List<Integer> hashtagIds = Arrays.stream(partyRequestDto.getPartyHashtagIdList()).boxed().toList(); //파티해시태그만
    List<Hashtag> hashtags = hashtagRepository.findAllById(hashtagIds);

    List<PartyRequestHashtagMapping> mappings = hashtags.stream()
            .map(hashtag -> new PartyRequestHashtagMapping(partyRequest, hashtag, yourHashtagList))
            .toList();

    partyRequestHashtagRepository.saveAll(mappings); //파티요청-해시태그 save
  }

  private String makeHashtagType(int[] yourHashtagIdList) {
    if (yourHashtagIdList.length == 0) {
      return "[]";
    }

    StringBuilder sb = new StringBuilder();
    sb.append("[");
    for (int i = 0; i < yourHashtagIdList.length; i++) {
      sb.append(yourHashtagIdList[i]);
      if (i < yourHashtagIdList.length - 1) {
        sb.append(",");
      }
    }
    sb.append("]");
    return sb.toString();
  }

  public PartyRequestDto getHashtagsList(Long partyRequestId, Member member) {
    return partyRequestQueryRepository.findHashtagsByPartyRequestId(partyRequestId, member.getMemberId());
  }


}
