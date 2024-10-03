package com.moreroom.domain.party.repository;

import static com.moreroom.domain.party.entity.QParty.party;
import static com.moreroom.domain.theme.entity.QTheme.theme;
import static com.moreroom.domain.hashtag.entity.QHashtag.hashtag;
import static com.moreroom.domain.cafe.entity.QCafe.cafe;
import static com.moreroom.domain.brand.entity.QBrand.brand;
import static com.moreroom.domain.review.entity.QReview.review;
import static com.moreroom.domain.mapping.member.entity.QMemberPartyMapping.memberPartyMapping;
import static com.moreroom.domain.mapping.party.entity.QPartyHashtagMapping.partyHashtagMapping;
import static com.moreroom.domain.mapping.theme.entity.QThemeGenreMapping.themeGenreMapping;


import com.moreroom.domain.mapping.theme.repository.ThemeGenreMappingRepository;
import com.moreroom.domain.party.dto.ChatroomListDto;
import com.moreroom.domain.party.dto.PartyInfoDto;
import com.moreroom.domain.party.exception.PartyNotFoundException;
import com.moreroom.domain.partyRequest.dto.HashTagsDto;
import com.moreroom.domain.theme.dto.response.ThemeCafeResponseDto;
import com.moreroom.domain.theme.dto.response.ThemeListResponseDto.ThemeListComponentDto;
import com.moreroom.domain.theme.dto.response.ThemeReviewResponseDto;
import com.moreroom.global.repository.QuerydslRepositoryCustom;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

@Slf4j
@Repository
public class PartyQueryRepository extends QuerydslRepositoryCustom {

  private final JPAQueryFactory jpaQueryFactory;
  private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
  private final ThemeGenreMappingRepository themeGenreMappingRepository;

  public PartyQueryRepository(JPAQueryFactory jpaQueryFactory,
      ThemeGenreMappingRepository themeGenreMappingRepository) {
    super(party);
    this.jpaQueryFactory = jpaQueryFactory;
    this.themeGenreMappingRepository = themeGenreMappingRepository;
  }

  public ChatroomListDto getAllPartyListByMemberId(Long memberId, boolean includeMember, Long lastPartyId, int pageSize) {
    BooleanBuilder whereClause = new BooleanBuilder();

    if (includeMember(memberId, includeMember) != null) {
      whereClause.and(includeMember(memberId, includeMember));
    }

    if (lastPartyId != null) {
      whereClause.and(party.partyId.gt(lastPartyId));
    }

    //조회
    List<Tuple> results = jpaQueryFactory
        .select(
            party.partyId,
            party.roomName,
            party.date,
            party.maxMember,
            theme.themeId,
            theme.poster,
            theme.title,
            theme.playtime,
            cafe.region.regionId,
            cafe.cafeId,
            brand.brandName,
            cafe.branchName,
            cafe.cafeName,
            cafe.address,
            hashtag.hashtagId,
            hashtag.hashtagName
        )
        .from(partyHashtagMapping)
        .join(partyHashtagMapping.party, party)
        .join(partyHashtagMapping.hashtag, hashtag)
        .join(party.theme, theme)
        .join(theme.cafe, cafe)
        .join(cafe.brand, brand)
        .where(whereClause)
        .orderBy(party.partyId.asc())
        .limit(pageSize+1) //다음 페지 존재 여부 확인
        .fetch();

    boolean hasMore = results.size() > pageSize;
    if (hasMore) {
      results.remove(results.size() - 1); //추가로 가져온 항목 제거
    }
    Long newLastPartyId = results.isEmpty() ? lastPartyId : results.get(results.size() - 1).get(party.partyId);

    // 자료 가공
    if (results.isEmpty()) {
      throw new PartyNotFoundException();
    }

    //List<PartyInfoDto> 생성
    Map<Long, List<Tuple>> resultsGroupedByPartyId = results.stream()
        .collect(Collectors.groupingBy(tuple -> tuple.get(party.partyId)));

    Set<Long> partyIdSet = new HashSet<>();
    Set<Integer> themeIdSet = new HashSet<>();

    List<PartyInfoDto> partyInfoDtoList = resultsGroupedByPartyId.entrySet().stream()
        .map(entry -> {
          //공통 정보 추출
          Long partyId = entry.getKey();
          Tuple tuple = entry.getValue().get(0);
          PartyInfoDto partyInfoDto = PartyInfoDto.builder()
              .partyId(partyId)
              .roomName(tuple.get(party.roomName))
              .date(tuple.get(party.date).format(formatter))
              .maxMember(tuple.get(party.maxMember))
              .build();

          //partyId, themeId 추출
          partyIdSet.add(tuple.get(party.partyId));
          themeIdSet.add(tuple.get(theme.themeId));

          //ThemeListComponentDto 생성
          ThemeListComponentDto themeDto = ThemeListComponentDto.builder()
              .themeId(tuple.get(theme.themeId))
              .title(tuple.get(theme.title))
              .poster(tuple.get(theme.poster))
              .playtime(tuple.get(theme.playtime))
              .regionId(tuple.get(cafe.region.regionId))
              .cafe(
                  ThemeCafeResponseDto.builder()
                      .cafeId(tuple.get(cafe.cafeId))
                      .brandName(tuple.get(brand.brandName))
                      .branchName(tuple.get(cafe.branchName))
                      .cafeName(tuple.get(cafe.cafeName))
                      .address(tuple.get(cafe.address))
                      .build()
              )
              .build();

          //List<HashTagsDto> 생성
          List<Tuple> tuples = entry.getValue();
          List<HashTagsDto> hashtagList = tuples.stream()
              .filter(t -> t.get(hashtag.hashtagId) != null)
              .map(t -> new HashTagsDto(
                  t.get(hashtag.hashtagId),
                  t.get(hashtag.hashtagName)
              ))
              .toList();

          //합체
          partyInfoDto.setTheme(themeDto);
          partyInfoDto.setHashtags(hashtagList);

          return partyInfoDto;

        })
        .toList();

    //memberCount 검색
    List<Tuple> memberCntTuple = jpaQueryFactory
        .select(memberPartyMapping.party.partyId, memberPartyMapping.count().intValue().as("memberCount"))
        .from(memberPartyMapping)
        .where(memberPartyMapping.party.partyId.in(partyIdSet))
        .groupBy(memberPartyMapping.party.partyId)
        .fetch();

    NumberPath<Integer> memberCountPath = Expressions.numberPath(Integer.class, "memberCount");
    Map<Long, Integer> memberCountMap = memberCntTuple.stream()
        .collect(Collectors.toMap(
            tuple -> tuple.get(memberPartyMapping.party.partyId),
            tuple -> tuple.get(memberCountPath)
        ));

    //리뷰 조회
    List<Tuple> reviewTuples = jpaQueryFactory
        .select(
            review.theme.themeId,
            review.count().as("count"),
            review.score.avg().as("score")
        )
        .from(review)
        .where(review.theme.themeId.in(themeIdSet))
        .groupBy(review.theme.themeId)
        .fetch();

    NumberPath<Long> countPath = Expressions.numberPath(Long.class, "count");
    NumberPath<Double> scorePath = Expressions.numberPath(Double.class, "score");

    Map<Integer, ThemeReviewResponseDto> reviewMap = reviewTuples.stream()
        .collect(Collectors.toMap(
            tuple -> tuple.get(review.theme.themeId),
            tuple -> ThemeReviewResponseDto.builder()
                .count(tuple.get(countPath))
                .score(tuple.get(scorePath))
                .build()
        ));

    //장르리스트 조회
    List<Tuple> genreTuples = jpaQueryFactory.
        select(
            themeGenreMapping.theme.themeId,
            themeGenreMapping.genre.genreName
        )
        .from(themeGenreMapping)
        .where(themeGenreMapping.theme.themeId.in(themeIdSet))
        .fetch();

    Map<Integer, List<String>> genreIdMap = genreTuples.stream()
        .collect(Collectors.groupingBy(
            tuple -> tuple.get(themeGenreMapping.theme.themeId),
            Collectors.mapping(
                tuple -> tuple.get(themeGenreMapping.genre.genreName),
                Collectors.toList()
            )
        ));

    // memberCount, review, genreList 집어넣기
    for (PartyInfoDto partyInfo : partyInfoDtoList) {
      Long partyId = partyInfo.getPartyId();
      Integer themeId = partyInfo.getTheme().getThemeId();
      partyInfo.setMemberCount(memberCountMap.get(partyId)); //memberCount 집어넣기
      partyInfo.getTheme().setReview(reviewMap.get(themeId)); //review 집어넣기
      partyInfo.getTheme().setGenreList(genreIdMap.get(themeId)); //genreList 집어넣기
    }

    return new ChatroomListDto(partyInfoDtoList, hasMore, newLastPartyId);
  }

  private BooleanExpression includeMember(Long memberId, boolean includeMember) {
    if (memberId == null) return null;
    JPQLQuery<Long> subQuery = JPAExpressions
        .select(memberPartyMapping.party.partyId)
        .from(memberPartyMapping)
        .where(memberPartyMapping.member.memberId.eq(memberId));

    return includeMember ? party.partyId.in(subQuery) : party.partyId.notIn(subQuery).and(party.addFlag.eq(true));
  }
}
