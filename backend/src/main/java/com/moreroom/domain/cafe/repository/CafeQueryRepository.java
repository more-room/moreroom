package com.moreroom.domain.cafe.repository;

import static com.moreroom.domain.brand.entity.QBrand.brand;
import static com.moreroom.domain.cafe.entity.QCafe.cafe;
import static com.moreroom.domain.genre.entity.QGenre.genre;
import static com.moreroom.domain.history.entity.QHistory.history;
import static com.moreroom.domain.mapping.theme.entity.QThemeGenreMapping.themeGenreMapping;
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
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
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
        List<Tuple> results = jpaQueryFactory
            .select(cafe.cafeId,
                cafe.brand.brandId,
                cafe.region.regionId,
                cafe.address,
                cafe.cafeName,
                cafe.latitude,
                cafe.longitude,
                theme.themeId.count())
            .from(cafe)
            .leftJoin(theme).on(cafe.cafeId.eq(theme.cafe.cafeId))
            .where(ce(c.getCafeName(), "cafeName", "like"),
                c.getBrandId() == null || c.getBrandId().isEmpty() ? null
                    : cafe.brand.brandId.in(c.getBrandId()),
                c.getRegion() == null ? null : cafe.region.regionId.eq(c.getRegion()))
            .groupBy(cafe)
            .fetch();

        // 2. Dto로 변환
        List<CafeListComponentDto> cafeList = results.stream()
            .map(tuple -> new CafeListComponentDto(
                tuple.get(cafe.cafeId),
                tuple.get(cafe.brand.brandId),
                tuple.get(cafe.region.regionId),
                tuple.get(cafe.address),
                tuple.get(cafe.cafeName),
                tuple.get(cafe.latitude),
                tuple.get(cafe.longitude),
                tuple.get(theme.themeId.count()).intValue() // count 값 처리
            ))
            .collect(Collectors.toList());

        return CafeListResponseDto.builder()
            .cafeList(cafeList)
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
                , history.isNotNull().coalesce(false)
            )
            .from(theme)
            .leftJoin(themeGenreMapping).on(themeGenreMapping.theme.themeId.eq(theme.themeId))
            .leftJoin(genre).on(genre.genreId.eq(themeGenreMapping.genre.genreId))
            .leftJoin(review).on(review.theme.themeId.eq(theme.themeId))
            .leftJoin(history)
            .on(history.member.memberId.eq(memberId), history.theme.themeId.eq(theme.themeId))
            .where(theme.cafe.cafeId.eq(cafeId))
            .groupBy(theme.themeId, genre.genreName, history)
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
            .brandId(result.getBrand().getBrandId())
            .regionId(result.getRegion().getRegionId())
            .address(result.getAddress())
            .cafeName(result.getCafeName())
            .tel(result.getTel())
            .link(result.getLink())
            .latitude(result.getLatitude())
            .longitude(result.getLongitude())
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
                ce(keyword, "cafeName", "like")
            )
            .offset((long) pageRequest.getPageNumber() * pageRequest.getPageSize())
            .limit(pageRequest.getPageSize())
            .fetch();

        return CafeSearchNameResponseDto.builder()
            .cafeList(list)
            .build();
    }
}
