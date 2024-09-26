package com.moreroom.domain.partyRequest.repository;

import static com.moreroom.domain.partyRequest.entity.QPartyRequest.partyRequest;
import static com.moreroom.domain.mapping.partyRequest.entity.QPartyRequestHashtagMapping.partyRequestHashtagMapping;
import static com.moreroom.domain.theme.entity.QTheme.theme;
import static com.moreroom.domain.hashtag.entity.QHashtag.hashtag;
import static com.moreroom.domain.member.entity.QMember.member;
import static com.moreroom.domain.mapping.member.entity.QMemberHashtagMapping.memberHashtagMapping;

import com.moreroom.domain.partyRequest.dto.HashTagsDto;
import com.moreroom.domain.partyRequest.dto.MemberDto;
import com.moreroom.domain.partyRequest.dto.PartyRequestDto;
import com.moreroom.domain.partyRequest.dto.StatusDto;
import com.moreroom.domain.partyRequest.dto.ThemeDto;
import com.moreroom.domain.partyRequest.exception.PartyRequestNotFoundException;
import com.moreroom.global.repository.QuerydslRepositoryCustom;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

@Slf4j
@Repository
public class PartyRequestQueryRepository extends QuerydslRepositoryCustom {

  private final JPAQueryFactory jpaQueryFactory;
  private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

  public PartyRequestQueryRepository(JPAQueryFactory jpaQueryFactory) {
    super(partyRequest);
    this.jpaQueryFactory = jpaQueryFactory;
  }

  public List<PartyRequestDto> findPartyRequestByMemberId(Long memberId) {
    //조회
    List<Tuple> results = jpaQueryFactory
        .select(
            partyRequest.partyRequestId,
            partyRequest.matchingStatus,
            theme.themeId,
            theme.poster,
            theme.title,
            partyRequest.createdAt,
            hashtag.hashtagId,
            hashtag.hashtagName)
        .from(partyRequest)
        .leftJoin(partyRequestHashtagMapping).on(partyRequest.partyRequestId.eq(partyRequestHashtagMapping.partyRequest.partyRequestId))
        .leftJoin(theme).on(theme.themeId.eq(partyRequest.theme.themeId))
        .leftJoin(hashtag).on(hashtag.hashtagId.eq(partyRequestHashtagMapping.hashtag.hashtagId))
        .where(partyRequest.member.memberId.eq(memberId))
        .fetch();

    // 결과 처리
    if (results.isEmpty()) {
      throw new PartyRequestNotFoundException();
    }

    //List<PartyRequestDto> 생성
    //1. partyRequestId 기준으로 그룹화
    Map<Long, List<Tuple>> resultsGroupedByPartyRequestId = results.stream()
        .collect(Collectors.groupingBy(tuple -> tuple.get(partyRequest.partyRequestId)));

    //2. List<PartyRequestDto> 생성
    return resultsGroupedByPartyRequestId.entrySet().stream()
        .map(entry -> {
          //공통 정보 추출
          Tuple tuple = entry.getValue().get(0);
          Long partyRequestId = entry.getKey();
          StatusDto status = StatusDto.builder()
              .statusId(tuple.get(partyRequest.matchingStatus).id())
              .statusName(tuple.get(partyRequest.matchingStatus).toString())
              .build();
          ThemeDto themeDto = ThemeDto.builder()
              .themeId(tuple.get(theme.themeId))
              .poster(tuple.get(theme.poster))
              .title(tuple.get(theme.title))
              .build();
          String createdAt = tuple.get(partyRequest.createdAt).format(formatter);

          //List<HashTagsDto> 생성
          List<Tuple> tuples = entry.getValue();
          List<HashTagsDto> hashtagList = tuples.stream()
              .filter(t -> t.get(hashtag.hashtagId) != null)
              .map(t -> new HashTagsDto(
                  t.get(hashtag.hashtagId),
                  t.get(hashtag.hashtagName)
              ))
              .toList();

          return PartyRequestDto.builder()
              .partyRequestId(partyRequestId)
              .status(status)
              .theme(themeDto)
              .createdAt(createdAt)
              .hashtagList(hashtagList)
              .build();
        })
        .toList();
  }

  public List<MemberDto> getMemberHashtagList(Long partyRequestId) {
    //조회
    //1. memberId 조회하는 서브쿼리
    JPAQuery<Long> memberIdList = jpaQueryFactory
        .select(partyRequest.member.memberId)
        .from(partyRequest)
        .where(partyRequest.redisUuid.eq(
            JPAExpressions.select(partyRequest.redisUuid)
                .from(partyRequest)
                .where(partyRequest.partyRequestId.eq(partyRequestId))
        ));

    //2. 쿼리 본문
    List<Tuple> results = jpaQueryFactory
        .select(
            member.memberId,
            member.nickname,
            member.photo,
            memberHashtagMapping.hashtag.hashtagId,
            memberHashtagMapping.hashtag.hashtagName
        )
        .from(member)
        .join(memberHashtagMapping).on(member.memberId.eq(memberHashtagMapping.member.memberId))
        .join(hashtag).on(hashtag.hashtagId.eq(memberHashtagMapping.hashtag.hashtagId))
        .where(member.memberId.in(memberIdList))
        .fetch();

    if (results.isEmpty()) {
      return new ArrayList<>(); //member조회 결과가 없으면 빈 리스트 반환
    }

    //List<MemberDto> 가공
    Map<Long, List<Tuple>> mapGroupedByMemberId = results.stream()
        .collect(Collectors.groupingBy(tuple -> tuple.get(member.memberId)));

    return mapGroupedByMemberId.entrySet().stream()
        .map(entry -> {
          Long memberId = entry.getKey();
          Tuple tuple = entry.getValue().get(0);
          String nickname = tuple.get(member.nickname);
          String photo = tuple.get(member.photo);

          List<HashTagsDto> memberHashtag = entry.getValue().stream()
              .map(e -> {
                Integer hashtagId = e.get(memberHashtagMapping.hashtag.hashtagId);
                String hashtagName = e.get(memberHashtagMapping.hashtag.hashtagName);
                return new HashTagsDto(hashtagId, hashtagName);
              })
              .toList();

          return MemberDto.builder()
              .memberId(memberId)
              .nickname(nickname)
              .photo(photo)
              .memberHashtag(memberHashtag)
              .build();
        })
        .toList();
  }

}
