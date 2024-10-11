package com.moreroom.domain.partyRequest.repository;

import com.moreroom.domain.cafe.entity.Cafe;
import com.moreroom.domain.hashtag.entity.Hashtag;
import com.moreroom.domain.mapping.partyRequest.entity.PartyRequestHashtagMapping;
import com.moreroom.domain.partyRequest.dto.*;
import com.moreroom.domain.partyRequest.exception.PartyRequestNotFoundException;
import com.moreroom.domain.theme.entity.Theme;
import com.moreroom.domain.theme.exception.ThemeNotFoundException;
import com.moreroom.global.repository.QuerydslRepositoryCustom;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

import static com.moreroom.domain.cafe.entity.QCafe.cafe;
import static com.moreroom.domain.hashtag.entity.QHashtag.hashtag;
import static com.moreroom.domain.mapping.member.entity.QMemberHashtagMapping.memberHashtagMapping;
import static com.moreroom.domain.mapping.partyRequest.entity.QPartyRequestHashtagMapping.partyRequestHashtagMapping;
import static com.moreroom.domain.member.entity.QMember.member;
import static com.moreroom.domain.partyRequest.entity.QPartyRequest.partyRequest;
import static com.moreroom.domain.theme.entity.QTheme.theme;

@Slf4j
@Repository
public class PartyRequestQueryRepository extends QuerydslRepositoryCustom {

  private final JPAQueryFactory jpaQueryFactory;
  private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:00");

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
            partyRequest.redisUuid,
            theme.themeId,
            theme.poster,
            theme.title,
            cafe.cafeName,
            cafe.branchName,
            partyRequest.createdAt,
            hashtag.hashtagId,
            hashtag.hashtagName)
        .from(partyRequest)
        .leftJoin(partyRequestHashtagMapping).on(partyRequest.partyRequestId.eq(partyRequestHashtagMapping.partyRequest.partyRequestId))
        .leftJoin(theme).on(theme.themeId.eq(partyRequest.theme.themeId))
        .leftJoin(cafe).on(theme.cafe.cafeId.eq(cafe.cafeId))
        .leftJoin(hashtag).on(hashtag.hashtagId.eq(partyRequestHashtagMapping.hashtag.hashtagId))
        .where(partyRequest.member.memberId.eq(memberId))
        .fetch();

    // 결과 처리
    if (results.isEmpty()) {
        return new ArrayList<>();
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
          String uuid = tuple.get(partyRequest.redisUuid);

          StatusDto status = Optional.ofNullable(tuple.get(partyRequest.matchingStatus))
              .map(matchingStatus -> StatusDto.builder()
                      .statusId(matchingStatus.id())
                      .statusName(matchingStatus.toString())
                      .build())
              .orElse(new StatusDto());

          ThemeDto themeDto = ThemeDto.builder()
              .themeId(tuple.get(theme.themeId))
              .poster(tuple.get(theme.poster))
              .title(tuple.get(theme.title))
              .brandName(tuple.get(cafe.cafeName))
              .branchName(tuple.get(cafe.branchName))
              .build();

          String createdAt = Optional.ofNullable(tuple.get(partyRequest.createdAt))
              .map(dateTime -> dateTime.format(formatter))
              .orElse("");

          //List<HashTagsDto> 생성
          List<HashTagsDto> hashtagList = entry.getValue().stream()
              .filter(t -> t.get(hashtag.hashtagId) != null)
              .map(t -> new HashTagsDto(
                  t.get(hashtag.hashtagId),
                  Optional.ofNullable(t.get(hashtag.hashtagName)).orElse("")
              ))
              .toList();

          return PartyRequestDto.builder()
              .partyRequestId(partyRequestId)
              .uuid(uuid)
              .status(status)
              .theme(themeDto)
              .createdAt(createdAt)
              .partyHashtagList(hashtagList)
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
            hashtag.hashtagId,
            hashtag.hashtagName
        )
        .from(member)
        .leftJoin(memberHashtagMapping).on(member.memberId.eq(memberHashtagMapping.member.memberId))
        .leftJoin(hashtag).on(hashtag.hashtagId.eq(memberHashtagMapping.hashtag.hashtagId))
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
          String nickname = Optional.ofNullable(tuple.get(member.nickname)).orElse("");
          String photo = Optional.ofNullable(tuple.get(member.photo)).orElse("");

          List<HashTagsDto> memberHashtag = entry.getValue().stream()
              .filter(e -> e.get(hashtag.hashtagId) != null)
              .map(e -> {
                Integer hashtagId = e.get(hashtag.hashtagId);
                String hashtagName = Optional.ofNullable(e.get(hashtag.hashtagName)).orElse("");
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

  public PartyRequestDto findHashtagsByPartyRequestId(Long partyRequestId, Long memberId) {
      //쿼리 1 : 전반적인 정보 (theme, hashtags)
      List<Tuple> results = jpaQueryFactory
              .select(theme, cafe, hashtag, partyRequestHashtagMapping)
              .from(partyRequest)
              .leftJoin(theme).on(partyRequest.theme.eq(theme))
              .leftJoin(cafe).on(theme.cafe.eq(cafe))
              .leftJoin(partyRequestHashtagMapping).on(partyRequestHashtagMapping.partyRequest.eq(partyRequest))
              .leftJoin(hashtag).on(partyRequestHashtagMapping.hashtag.eq(hashtag))
              .where(partyRequest.partyRequestId.eq(partyRequestId))
              .fetch();

      if (results.isEmpty()) {
          throw new PartyRequestNotFoundException();
      }

      Tuple tuple = results.get(0);
      ThemeDto themeDto = ThemeDto.builder()
              .themeId(Optional.ofNullable(tuple.get(theme)).map(Theme::getThemeId).orElseThrow(ThemeNotFoundException::new))
              .poster(Optional.ofNullable(tuple.get(theme)).map(Theme::getPoster).orElse(null))
              .title(Optional.ofNullable(tuple.get(theme)).map(Theme::getTitle).orElse(null))
              .brandName(Optional.ofNullable(tuple.get(cafe)).map(Cafe::getCafeName).orElse(null))
              .branchName(Optional.ofNullable(tuple.get(cafe)).map(Cafe::getBranchName).orElse(null))
              .build();

      String yours = Optional.ofNullable(tuple.get(partyRequestHashtagMapping))
              .map(PartyRequestHashtagMapping::getHashtagType)
              .orElse("[]");
      List<Integer> yourHashtagIdList = convertToIntegerList(yours);

      //partyHashtagList 가공
      List<HashTagsDto> partyHashtagList = results.stream()
              .map(t -> Optional.ofNullable(t.get(hashtag))
                      .map(h -> new HashTagsDto(h.getHashtagId(), h.getHashtagName()))
                      .orElse(new HashTagsDto()))
              .distinct()
              .toList();

      //쿼리 2 : myHashtagList
      List<Hashtag> myHashtagList = jpaQueryFactory
              .select(hashtag)
              .from(member)
              .join(memberHashtagMapping).on(memberHashtagMapping.member.eq(member))
              .join(hashtag).on(hashtag.eq(memberHashtagMapping.hashtag))
              .where(member.memberId.eq(memberId))
              .fetch();


      List<HashTagsDto> myHashtagDtoList;
      if (myHashtagList.isEmpty()) {
          myHashtagDtoList = new ArrayList<>();
      } else {
          myHashtagDtoList = myHashtagList.stream()
                  .map(h -> new HashTagsDto(h.getHashtagId(), h.getHashtagName()))
                  .toList();
      }

      //쿼리 3 : yourHashtagList
      List<Hashtag> yourHashtagList = jpaQueryFactory
              .select(hashtag)
              .from(hashtag)
              .where(hashtag.hashtagId.in(yourHashtagIdList))
              .fetch();

      List<HashTagsDto> yourHashtagDtoList;
      if (yourHashtagList.isEmpty()) {
          yourHashtagDtoList = new ArrayList<>();
      } else {
          yourHashtagDtoList = yourHashtagList.stream()
                  .map(h -> new HashTagsDto(h.getHashtagId(), h.getHashtagName()))
                  .toList();
      }

      return PartyRequestDto.builder()
              .partyRequestId(partyRequestId)
              .theme(themeDto)
              .partyHashtagList(partyHashtagList)
              .myHashtagList(myHashtagDtoList)
              .yourHashtagList(yourHashtagDtoList)
              .build();
  }

  private List<Integer> convertToIntegerList(String hashtagList) {
      List<Integer> result = new ArrayList<>();

      if (hashtagList == null || hashtagList.equals("[]")) return result;

      String[] numbers = hashtagList.substring(1, hashtagList.length() - 1).split(",");
      for (String number : numbers) {
          try {
              result.add(Integer.parseInt(number.trim()));
          } catch (NumberFormatException e) {
              log.error("숫자로 변환할 수 없는 값 발견: {}", number);
          }
      }
      return result;
  }

}
