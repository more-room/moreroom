package com.moreroom.domain.theme.repository;

import static com.moreroom.domain.brand.entity.QBrand.brand;
import static com.moreroom.domain.cafe.entity.QCafe.cafe;
import static com.moreroom.domain.genre.entity.QGenre.genre;
import static com.moreroom.domain.mapping.theme.entity.QThemeGenreMapping.themeGenreMapping;
import static com.moreroom.domain.playLog.entity.QPlayLog.playLog;
import static com.moreroom.domain.region.entity.QRegion.region;
import static com.moreroom.domain.review.entity.QReview.review;
import static com.moreroom.domain.theme.entity.QTheme.theme;

import com.moreroom.domain.brand.entity.Brand;
import com.moreroom.domain.cafe.entity.Cafe;
import com.moreroom.domain.theme.dto.request.ThemeListRequestDto;
import com.moreroom.domain.theme.dto.response.ThemeCafeResponseDto;
import com.moreroom.domain.theme.dto.response.ThemeDetailResponseDto;
import com.moreroom.domain.theme.dto.response.ThemeListResponseDto;
import com.moreroom.domain.theme.dto.response.ThemeListResponseDto.ThemeListComponentDto;
import com.moreroom.domain.theme.dto.response.ThemeMemberResponseDto;
import com.moreroom.domain.theme.dto.response.ThemeReviewResponseDto;
import com.moreroom.domain.theme.dto.response.ThemeSearchTitleResponseDto;
import com.moreroom.domain.theme.dto.response.ThemeSearchTitleResponseDto.ThemeSearchTitleComponentResponseDto;
import com.moreroom.domain.theme.entity.Theme;
import com.moreroom.domain.theme.exception.ThemeNotFoundException;
import com.moreroom.global.dto.PageResponseDto;
import com.moreroom.global.repository.QuerydslRepositoryCustom;
import com.moreroom.global.util.StringUtil;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

@Slf4j
@Repository
public class ThemeQueryRepository extends QuerydslRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    public ThemeQueryRepository(JPAQueryFactory jpaQueryFactory) {
        super(theme);
        this.jpaQueryFactory = jpaQueryFactory;
    }


    public ThemeDetailResponseDto findThemeDetailById(Integer themeId, Long memberId) {
        // 1. theme, review, member, genre 정보 함께 조회
        List<Tuple> results = jpaQueryFactory
            .select(theme,
                review.count().coalesce(0L),    // 리뷰 개수 기본값 0
                review.score.avg().coalesce(0.0), // 리뷰 평점 기본값 0.0
                playLog.playCount.coalesce(0).gt(0)
            )
            .from(theme)
            .leftJoin(review).on(review.theme.themeId.eq(themeId))   // 리뷰
            .leftJoin(playLog).on(playLog.themeId.eq(theme.themeId),
                playLog.memberId.eq(memberId))  // playLog - 플레이 여부 확인
            .where(theme.themeId.eq(themeId))
            .groupBy(theme)
            .fetch();

        // 2. 결과 처리
        if (results.isEmpty()) {
            throw new ThemeNotFoundException();
        }
        // 2. 결과 처리
        Tuple result = results.get(0);
        Theme themeResult = result.get(theme);
        long reviewCount = result.get(1, Long.class);
        double reviewScore = result.get(review.score.avg().coalesce(0.0));
        boolean playFlag = result.get(3, Boolean.class);

        List<String> genreList = jpaQueryFactory
            .select(genre.genreName)
            .from(themeGenreMapping)
            .leftJoin(genre).on(genre.genreId.eq(themeGenreMapping.genre.genreId))
            .where(themeGenreMapping.theme.themeId.eq(themeId))
            .fetch();

        // 필요한 데이터들을 ThemeDetails 객체로 반환
        return ThemeDetailResponseDto.toDto(themeResult, reviewCount, reviewScore, playFlag,
            genreList);
    }

    public PageResponseDto findAllByFilter(ThemeListRequestDto f, PageRequest pageRequest,
        Long memberId) {
        // 1. 테마 조회
        // 동적 쿼리를 만들기 위해 boolean Expression 사용
        BooleanExpression regionCheck =
            f.getRegion() != null ? StringUtil.isParent(f.getRegion()) ? region.parentRegionId.eq(
                f.getRegion()) : region.regionId.eq(f.getRegion()) : null;
        BooleanExpression genreCheck =
            f.getGenreList() != null ? genre.genreId.in(f.getGenreList()) : null;
        BooleanExpression brandCheck =
            f.getBrandId() != null ? cafe.brand.brandId.eq(f.getBrandId()) : null;
        BooleanBuilder builder = new BooleanBuilder();
        builder.and(eq(f.getLevel(), "level"))
            .and(eq(f.getPlaytime(), "playtime"))
            .and(ce(f.getPrice(), "price", "loe"))
            .and(ce(f.getPeople(), "maxPeople", "goe"))
            .and(ce(f.getPeople(), "minPeople", "loe"))
            .and(ce(f.getTitle(), "title", "like"))
            .and(regionCheck)
            .and(genreCheck)
            .and(brandCheck);
        // custom expression (ce) 사용
        // (1) 전체 개수 읽기
        List<Integer> idList = jpaQueryFactory
            .select(theme.themeId)
            .from(theme)
            .leftJoin(cafe).on(cafe.cafeId.eq(theme.cafe.cafeId))
            .innerJoin(region).on(region.regionId.eq(cafe.region.regionId))
            .leftJoin(themeGenreMapping)
            .on(themeGenreMapping.theme.themeId.eq(theme.themeId)) // 테마와 장르 매핑 조인
            .innerJoin(genre).on(genre.genreId.eq(themeGenreMapping.genre.genreId)) // 장르 테이블 조인
            .where(builder)
            .groupBy(theme.themeId)
            .having(
                f.getGenreList() != null ? genre.genreId.count().eq((long) f.getGenreList().length)
                    : null
            )
            .fetch();
        // 검색 결과 없을 경우 빈 배열 반환
        if (idList.isEmpty()) {
            ThemeListResponseDto themeListResponseDto = ThemeListResponseDto.builder()
                .themeList(new ArrayList<>())
                .build();
            Integer pn = pageRequest.getPageNumber();
            Integer ps = idList.size();
            Long te = (long) idList.size();
            Long tp = (te + pageRequest.getPageSize() - 1) / pageRequest.getPageSize();

            return PageResponseDto.toDto(themeListResponseDto, pn, ps, tp, te);
        }

        // (2) 데이터 읽어오기
        List<Tuple> results = jpaQueryFactory
            .select(theme, cafe, region.regionId,
                playLog.playCount.coalesce(0).gt(0),
                brand
            ) // theme, regionId, genreName 반환
            .from(theme)
            .leftJoin(cafe).on(cafe.cafeId.eq(theme.cafe.cafeId))
            .innerJoin(region).on(region.regionId.eq(cafe.region.regionId))
            .leftJoin(playLog).on(playLog.themeId.eq(theme.themeId), playLog.memberId.eq(memberId))
            .leftJoin(brand).on(brand.brandId.eq(cafe.brand.brandId))
            .where(theme.themeId.in(idList))
            .groupBy(theme)
            .orderBy(theme.themeId.asc())
            // pagination
            .offset((long) pageRequest.getPageNumber() * pageRequest.getPageSize())
            .limit(pageRequest.getPageSize())
            .fetch();

        // (3) 부가 정보 읽기(review, genre) -> 1대 다여서 pagination을 위해 분리
        // results에서 themeId 추출
        List<Integer> themeIdList = results.stream()
            .map(tuple -> tuple.get(theme).getThemeId())
            .toList();
        List<Tuple> resultsDetail = jpaQueryFactory
            .select(theme.themeId,
                review.count(),
                review.score.avg(),
                genre.genreName)
            .from(theme)
            .innerJoin(themeGenreMapping).on(themeGenreMapping.theme.themeId.eq(theme.themeId))
            .innerJoin(genre).on(genre.genreId.eq(themeGenreMapping.genre.genreId))
            .leftJoin(review).on(review.theme.themeId.eq(theme.themeId)) // review
            .where(theme.themeId.in(themeIdList))
            .groupBy(theme, genre)
            .fetch();

        // 2. 변환
        List<ThemeListComponentDto> themeList = new ArrayList<>();
        Map<Integer, ThemeListComponentDto> themeMap = new HashMap<>();

        // (1) 기본 테마 정보 먼저 넣기
        for (Tuple tuple : results) {
            Theme theme = tuple.get(0, Theme.class);
            Cafe cafe = tuple.get(1, Cafe.class);
            String regionId = tuple.get(2, String.class);
            Boolean playFlag = tuple.get(3, Boolean.class);
            Brand brand = tuple.get(4, Brand.class);

            // 테마 DTO 생성
            ThemeListComponentDto themeDto = themeMap.get(theme.getThemeId());
            if (themeDto == null) {
                themeDto = ThemeListComponentDto.builder()
                    .themeId(theme.getThemeId())
                    .title(theme.getTitle())
                    .poster(theme.getPoster())
                    .playtime(theme.getPlaytime())
                    .genreList(new ArrayList<>())
                    .regionId(regionId)
                    .cafe(ThemeCafeResponseDto.builder()
                        .address(cafe.getAddress())
                        .cafeName(cafe.getCafeName())
                        .branchName(cafe.getBranchName())
                        .brandName(brand != null ? brand.getBrandName() : null)
                        .cafeId(cafe.getCafeId())
                        .build())
                    .member(ThemeMemberResponseDto.builder()
                        .playFlag(playFlag)
                        .build())
                    .build();

                themeMap.put(theme.getThemeId(), themeDto);
            }
        }

        // (2) 세부 정보 읽으면서 데이터 넣기
        for (Tuple tuple : resultsDetail) {
            Integer themeId = tuple.get(0, Integer.class);
            Long reviewCount = tuple.get(1, Long.class);
            Double avgScore = tuple.get(2, Double.class);
            String genreName = tuple.get(3, String.class);

            ThemeListComponentDto themeDto = themeMap.get(themeId);
            if (themeDto != null) {
                themeDto.setReview(ThemeReviewResponseDto.builder()
                    .count(reviewCount)
                    .score(avgScore)
                    .build());
                if (genreName != null) {
                    themeDto.getGenreList().add(genreName);
                }
            }
        }

        themeList = themeMap.values().stream().toList();
        ThemeListResponseDto themeListResponseDto = ThemeListResponseDto.builder()
            .themeList(themeList)
            .build();
        Integer pn = pageRequest.getPageNumber();
        Integer ps = themeList.size();
        Long te = (long) idList.size();
        Long tp = (te + pageRequest.getPageSize() - 1) / pageRequest.getPageSize();

        return PageResponseDto.toDto(themeListResponseDto, pn, ps, tp, te);
    }


    public ThemeListResponseDto findByThemeIds(List<Integer> themeIds, Long memberId) {
        // 1. 테마 및 관련 정보 조회
        List<Tuple> results = jpaQueryFactory
            .select(theme, cafe, region.regionId,
                review.count(), review.score.avg(), genre.genreName
                , playLog.playCount.coalesce(0).gt(0)
                , brand
            )
            .from(theme)
            .leftJoin(cafe).on(cafe.cafeId.eq(theme.cafe.cafeId))
            .innerJoin(region).on(region.regionId.eq(cafe.region.regionId))
            .leftJoin(themeGenreMapping).on(themeGenreMapping.theme.themeId.eq(theme.themeId))
            .leftJoin(genre).on(genre.genreId.eq(themeGenreMapping.genre.genreId))
            .leftJoin(review).on(review.theme.themeId.eq(theme.themeId))
            .leftJoin(playLog).on(playLog.themeId.eq(theme.themeId), playLog.memberId.eq(memberId))
            .leftJoin(brand).on(brand.brandId.eq(cafe.brand.brandId))
            .where(theme.themeId.in(themeIds))
            .groupBy(theme.themeId, cafe.cafeId, region.regionId, genre.genreName)
            .orderBy(theme.themeId.asc())
            .fetch();

        // 2. 변환
        Map<Integer, ThemeListComponentDto> themeMap = new HashMap<>();

        for (Tuple tuple : results) {
            Theme theme = tuple.get(0, Theme.class);
            Cafe cafe = tuple.get(1, Cafe.class);
            String regionId = tuple.get(2, String.class);
            Long reviewCount = tuple.get(3, Long.class);
            Double avgScore = tuple.get(4, Double.class);
            String genreName = tuple.get(5, String.class);
            Boolean playFlag = tuple.get(6, Boolean.class);
            Brand brand = tuple.get(7, Brand.class);

            // DTO 생성 및 업데이트
            ThemeListComponentDto themeDto = themeMap.computeIfAbsent(theme.getThemeId(),
                id -> ThemeListComponentDto.builder()
                    .themeId(theme.getThemeId())
                    .title(theme.getTitle())
                    .poster(theme.getPoster())
                    .playtime(theme.getPlaytime())
                    .genreList(new ArrayList<>())
                    .regionId(regionId)
                    .cafe(ThemeCafeResponseDto.builder()
                        .address(cafe.getAddress())
                        .cafeName(cafe.getCafeName())
                        .branchName(cafe.getBranchName())
                        .brandName(brand != null ? brand.getBrandName() : null)
                        .cafeId(cafe.getCafeId())
                        .build())
                    .member(ThemeMemberResponseDto.builder()
                        .playFlag(playFlag)
                        .build())
                    .build());

            // 리뷰 정보 업데이트
            themeDto.setReview(ThemeReviewResponseDto.builder()
                .count(reviewCount)
                .score(avgScore)
                .build());

            // 장르 추가 (중복 체크)
            if (genreName != null && !themeDto.getGenreList().contains(genreName)) {
                themeDto.getGenreList().add(genreName);
            }
        }

        List<ThemeListComponentDto> result = new ArrayList<>(themeMap.values());
        result.sort(Comparator.comparingInt(o -> themeIds.indexOf(o.getThemeId())));
        ThemeListResponseDto themeListResponseDto = ThemeListResponseDto.builder()
            .themeList(result)
            .build();

        return themeListResponseDto;
    }

    public ThemeSearchTitleResponseDto findAllByTitle(String keyword, PageRequest pageRequest) {
        List<ThemeSearchTitleComponentResponseDto> list = jpaQueryFactory
            .select(Projections.constructor(ThemeSearchTitleComponentResponseDto.class,
                Expressions.numberTemplate(Integer.class, "MIN({0})", theme.themeId), // 첫번째 ID
                theme.title))
            .from(theme)
            .where(
                ce(keyword, "title", "like")
            )
            .groupBy(theme.title)
            .offset((long) pageRequest.getPageNumber() * pageRequest.getPageSize())
            .limit(pageRequest.getPageSize())
            .fetch();

        return ThemeSearchTitleResponseDto.builder()
            .themeList(list)
            .build();
    }
}
