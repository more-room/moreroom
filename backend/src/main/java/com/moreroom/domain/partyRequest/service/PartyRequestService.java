package com.moreroom.domain.partyRequest.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.moreroom.domain.hashtag.entity.Hashtag;
import com.moreroom.domain.hashtag.repository.HashtagRepository;
import com.moreroom.domain.mapping.member.entity.MemberHashtagMapping;
import com.moreroom.domain.mapping.member.repository.MemberHashtagMappingRepository;
import com.moreroom.domain.mapping.partyRequest.entity.PartyRequestHashtagMapping;
import com.moreroom.domain.mapping.partyRequest.repository.PartyRequestHashtagRepository;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.member.repository.MemberRepository;
import com.moreroom.domain.partyRequest.dto.HashTagsDto;
import com.moreroom.domain.partyRequest.dto.MemberDto;
import com.moreroom.domain.partyRequest.dto.MockDto;
import com.moreroom.domain.partyRequest.dto.PartyRequestDto;
import com.moreroom.domain.partyRequest.dto.SettingPartyRequestDto;
import com.moreroom.domain.partyRequest.dto.StatusDto;
import com.moreroom.domain.partyRequest.dto.ThemeDto;
import com.moreroom.domain.partyRequest.entity.MatchingStatus;
import com.moreroom.domain.partyRequest.entity.PartyRequest;
import com.moreroom.domain.partyRequest.repository.PartyRequestRepository;
import com.moreroom.domain.theme.entity.Theme;
import com.moreroom.domain.theme.repository.ThemeRepository;
import com.moreroom.global.util.RedisUtil;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PartyRequestService {

  private final PartyRequestRepository partyRequestRepository;
  private final MemberRepository memberRepository;
  private final ThemeRepository themeRepository;
  private final RedisUtil redisUtil;
  private final MemberHashtagMappingRepository memberHashtagMappingRepository;
  private final HashtagRepository hashtagRepository;
  private final PartyRequestHashtagRepository partyRequestHashtagRepository;
  private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

  //시연용 함수
//  public List<MockDto> getPartyRequestList(Long memberId) {
//    List<PartyRequest> allByMemberId = partyRequestRepository.findAllByMemberId(memberId);
//    return allByMemberId.stream()
//        .map(a -> MockDto.builder()
//            .partyRequestId(a.getPartyRequestId())
//            .memberId(a.getMember().getMemberId())
//            .themeId(a.getTheme().getThemeId())
//            .createdAt(a.getCreatedAt())
//            .matchingStatus(a.getMatchingStatus().toString())
//            .uuid(a.getRedisUuid())
//            .build()
//        ).toList();
//  }

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
    Long requestId = partyRequest.getPartyRequestId();
    List<PartyRequestHashtagMapping> list = new ArrayList<>();
    for (int i : partyRequestDto.getPartyHashtagIdList()) {
      list.add(PartyRequestHashtagMapping.create(requestId, i));
    }
    for (int i : partyRequestDto.getMyHashtagIdList()) {
      list.add(PartyRequestHashtagMapping.create(requestId, i));
    }
    for (int i : partyRequestDto.getYourHashtagIdList()) {
      list.add(PartyRequestHashtagMapping.create(requestId, i));
    }
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
//  public List<PartyRequestDto> getPartyRequestList(Long memberId) {
//    List<PartyRequest> partyRequestList = partyRequestRepository.findAllByMemberId(memberId);
//    List<PartyRequestDto> response = new ArrayList<>();
//    for (PartyRequest pr : partyRequestList) {
//      switch(pr.getMatchingStatus()) {
//        case MatchingStatus.NOT_MATCHED -> ;
//        case MatchingStatus.MATCHED -> ;
//        case MatchingStatus.PENDING -> ;
//        case MatchingStatus.DISABLED -> ;
//      }
//    }
//  }

  public PartyRequestDto makePartyRequestDto(PartyRequest partyRequest, boolean getMemberInfo) {
    Long partyRequestId = partyRequest.getPartyRequestId();
    List<MemberDto> memberInfoList = getMemberInfoList(partyRequest);
    StatusDto status = StatusDto.builder()
        .statusId(partyRequest.getMatchingStatus().getId())
        .statusName(partyRequest.getMatchingStatus().toString())
        .members(memberInfoList)
        .build();
    Theme theme = partyRequest.getTheme();
    ThemeDto themeDto = new ThemeDto(theme.getThemeId(), theme.getPoster(), theme.getTitle());
    String createdAt = partyRequest.getCreatedAt().format(formatter);

    return null;
  }

  public List<MemberDto> getMemberInfoList(PartyRequest partyRequest) {
    String key = "PARTYMATCH:" + partyRequest.getRedisUuid();
    List<MemberDto> result = new ArrayList<>();
    try {
      HashMap<Long, String> partyAcceptRecordMap = redisUtil.getLongStringHashMap(key);
      List<Long> memberIdList = new ArrayList<>();
      for (Long memberId : partyAcceptRecordMap.keySet()) {
        if (memberId > 0) memberIdList.add(memberId);
      }
      List<Member> memberList = memberRepository.findAllByIdIn(memberIdList);
      for (Member m : memberList) {
        result.add(makeMemberDto(m));
      }
      return result;
    } catch (JsonProcessingException e) {
      e.printStackTrace();
      throw new RuntimeException(e);
    }
  }

  public MemberDto makeMemberDto(Member member) {
    List<HashTagsDto> memberHashtag = makeMemberHashtagDto(member);
    return MemberDto.builder()
        .memberId(member.getMemberId())
        .nickname(member.getNickname())
        .memberHashtag(memberHashtag)
        .build();
  }

  public List<HashTagsDto> makeMemberHashtagDto(Member member) {
    List<MemberHashtagMapping> memberHashtagMappingList = memberHashtagMappingRepository.findByMember(member);
    List<Integer> hashtagIdList = new ArrayList<>();
    for (MemberHashtagMapping tag : memberHashtagMappingList) {
      hashtagIdList.add(tag.getHashtag().getHashtagId());
    }
    List<Hashtag> hashtags = hashtagRepository.findAllByIdIn(hashtagIdList);
    return hashtags.stream()
        .map(h -> new HashTagsDto(h.getHashtagId(), h.getHashtagName()))
        .toList();
  }

//  public List<HashTagsDto> makePartyHashtagDto(Long partyRequestId) {
//    partyRequestHashtagRepository.
//  }


}
