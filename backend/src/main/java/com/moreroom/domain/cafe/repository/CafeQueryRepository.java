package com.moreroom.domain.cafe.repository;

import static com.moreroom.domain.brand.entity.QBrand.brand;
import static com.moreroom.domain.cafe.entity.QCafe.cafe;
import static com.moreroom.domain.genre.entity.QGenre.genre;
import static com.moreroom.domain.mapping.theme.entity.QThemeGenreMapping.themeGenreMapping;
import static com.moreroom.domain.playLog.entity.QPlayLog.playLog;
import static com.moreroom.domain.region.entity.QRegion.region;
import static com.moreroom.domain.review.entity.QReview.review;
import static com.moreroom.domain.theme.entity.QTheme.theme;

import com.moreroom.domain.cafe.dto.Response.CafeDetailResponseDto;
import com.moreroom.domain.cafe.dto.Response.CafeListComponentDto;
import com.moreroom.domain.cafe.dto.Response.CafeListResponseDto;
import com.moreroom.domain.cafe.dto.Response.CafeSearchNameResponseDto;
import com.moreroom.domain.cafe.dto.Response.CafeSearchNameResponseDto.CafeSearchNameComponentDto;
import com.moreroom.domain.cafe.dto.Response.CafeThemeDetailResponseDto;
import com.moreroom.domain.cafe.dto.request.CafeListRequestDto;
import com.moreroom.domain.cafe.entity.Cafe;
import com.moreroom.domain.theme.dto.response.ThemeListResponseDto.ThemeListComponentDto;
import com.moreroom.domain.theme.dto.response.ThemeMemberResponseDto;
import com.moreroom.domain.theme.dto.response.ThemeReviewResponseDto;
import com.moreroom.domain.theme.entity.Theme;
import com.moreroom.global.repository.QuerydslRepositoryCustom;
import com.moreroom.global.util.StringUtil;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Repository;

@Repository
public class CafeQueryRepository extends QuerydslRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    public CafeQueryRepository(JPAQueryFactory jpaQueryFactory) {
        super(cafe);
        this.jpaQueryFactory = jpaQueryFactory;
    }

    public CafeListResponseDto findCafes(CafeListRequestDto c) {
        // 1. 카페 데이터 조회
        String cafeName = c.getCafeName();
        List<Integer> brandIds = c.getBrandId();
        String regionId = c.getRegion();
        System.out.println("regionId = " + regionId);
        BooleanExpression nameCondition = cafeName == null ? null : cafe.cafeName.like(cafeName);
        BooleanExpression brandCondition =
            brandIds == null || brandIds.isEmpty() ? null : cafe.brand.brandId.in(brandIds);
        BooleanExpression regionCondition =
            regionId != null ? StringUtil.isParent(regionId) ? region.parentRegionId.eq(regionId)
                : region.regionId.eq(regionId) : null;

        List<Tuple> list = jpaQueryFactory
            .select(cafe.cafeId, theme.poster)
            .from(theme)
            .leftJoin(review).on(theme.themeId.eq(review.theme.themeId))
            .where(theme.cafe.cafeId.eq(cafe.cafeId))
            .groupBy(theme.themeId)
            .orderBy(review.reviewId.count().desc())
            .limit(1)
            .fetch();

        List<CafeListComponentDto> results = jpaQueryFactory
            .select(Projections.constructor(CafeListComponentDto.class,
                cafe.cafeId,
                cafe.brand.brandId.as("brandId"),
                cafe.region.regionId.as("regionId"),
                cafe.address,
                cafe.cafeName,
                cafe.latitude,
                cafe.longitude,
                theme.themeId.countDistinct().intValue().as("themeCount"),
                review.reviewId.count().intValue().as("reviewCount"),
                JPAExpressions.select(theme.poster)
                    .from(theme)
                    .leftJoin(review).on(theme.themeId.eq(review.theme.themeId))
                    .where(theme.cafe.cafeId.eq(cafe.cafeId))
                    .groupBy(theme.themeId)
                    .having(review.reviewId.count().eq(
                            JPAExpressions.select(theme.themeId.count())
                                .from(review)
                                .leftJoin(theme).on(theme.themeId.eq(review.theme.themeId))
                                .where(theme.cafe.cafeId.eq(cafe.cafeId))
                                .groupBy(theme.themeId)
                                .orderBy(review.reviewId.count().desc())
                                .limit(1)
                        )
                    )
            ))
            .from(cafe)
            .leftJoin(theme).on(cafe.cafeId.eq(theme.cafe.cafeId))
            .leftJoin(review).on(theme.themeId.eq(review.theme.themeId))
            .where(nameCondition, brandCondition
                , regionCondition, cafe.openFlag.isTrue()
            )
            .groupBy(cafe.cafeId)
            .fetch();

        // 2. Dto로 변환


        return CafeListResponseDto.builder()
            .cafeList(results)
            .build();
    }

    public CafeDetailResponseDto findCafeByCafeId(Integer cafeId, long memberId) {
        // 1. 데이터 조회
        // (1) 카페 정보
        Cafe result = jpaQueryFactory
            .select(cafe)
            .from(cafe)
            .where(cafe.cafeId.eq(cafeId))
            .fetchFirst();

        // (2) 테마 정보
        List<Tuple> results = jpaQueryFactory
            .select(theme, review.count(), review.score.avg(), genre.genreName
                , playLog.playCount.coalesce(0).gt(0)
            )
            .from(theme)
            .leftJoin(themeGenreMapping).on(themeGenreMapping.theme.themeId.eq(theme.themeId))
            .leftJoin(genre).on(genre.genreId.eq(themeGenreMapping.genre.genreId))
            .leftJoin(review).on(review.theme.themeId.eq(theme.themeId))
            .leftJoin(playLog)
            .on(playLog.themeId.eq(theme.themeId), playLog.memberId.eq(memberId))
            .where(theme.cafe.cafeId.eq(cafeId))
            .groupBy(theme.themeId, genre.genreName)
            .orderBy(theme.themeId.asc())
            .fetch();

        // 2. 변환
        Map<Integer, ThemeListComponentDto> themeMap = new HashMap<>();

        for (Tuple tuple : results) {
            Theme theme = tuple.get(0, Theme.class);
            Long reviewCount = tuple.get(1, Long.class);
            Double avgScore = tuple.get(2, Double.class);
            String genreName = tuple.get(3, String.class);
            Boolean playFlag = tuple.get(4, Boolean.class);

            // DTO 생성 및 업데이트
            ThemeListComponentDto themeDto = themeMap.computeIfAbsent(theme.getThemeId(),
                id -> ThemeListComponentDto.builder()
                    .themeId(theme.getThemeId())
                    .title(theme.getTitle())
                    .poster(theme.getPoster())
                    .playtime(theme.getPlaytime())
                    .genreList(new ArrayList<>())
                    .member(ThemeMemberResponseDto.builder()
                        .playFlag(playFlag)
                        .build())
                    .review(ThemeReviewResponseDto.builder()
                        .count(reviewCount)
                        .score(avgScore)
                        .build())
                    .build());

            // 장르 추가 (중복 체크)
            if (genreName != null && !themeDto.getGenreList().contains(genreName)) {
                themeDto.getGenreList().add(genreName);
            }
        }

        CafeDetailResponseDto cafeDetailResponseDto = CafeDetailResponseDto.builder()
            .cafeId(result.getCafeId())
            .brandId(result.getBrand() == null ? null : result.getBrand().getBrandId())
            .regionId(result.getRegion() == null ? null : result.getRegion().getRegionId())
            .address(result.getAddress())
            .cafeName(result.getCafeName())
            .tel(result.getTel())
            .link(result.getLink())
            .latitude(result.getLatitude())
            .longitude(result.getLongitude())
            .openFlag(result.isOpenFlag())
            .themeList(new ArrayList<>(themeMap.values()))
            .build();

        return cafeDetailResponseDto;
    }

    public CafeThemeDetailResponseDto findByThemeId(Integer themeId) {
        Tuple result = jpaQueryFactory
            .select(cafe, brand.brandName)
            .from(cafe)
            .leftJoin(brand).on(cafe.brand.brandId.eq(brand.brandId))
            .where(cafe.cafeId.eq(
                JPAExpressions.select(theme.cafe.cafeId)
                    .from(theme)
                    .where(theme.themeId.eq(themeId))
            ))
            .fetchOne();

        Cafe cafe = result.get(0, Cafe.class);
        String brandName = result.get(1, String.class);

        return CafeThemeDetailResponseDto.toDto(cafe, brandName);

    }

    public CafeSearchNameResponseDto findAllByCafeName(String keyword, PageRequest pageRequest) {
        List<CafeSearchNameComponentDto> list = jpaQueryFactory
            .select(
                Projections.constructor(CafeSearchNameComponentDto.class,
                    cafe.cafeId, cafe.cafeName)
            )
            .from(cafe)
            .where(
                ce(keyword, "cafeName", "like"),
                cafe.openFlag.eq(true)
            )
            .offset((long) pageRequest.getPageNumber() * pageRequest.getPageSize())
            .limit(pageRequest.getPageSize())
            .fetch();

        return CafeSearchNameResponseDto.builder()
            .cafeList(list)
            .build();
    }
}
