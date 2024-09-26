package com.moreroom.domain.cafe.repository;

import static com.moreroom.domain.brand.entity.QBrand.brand;
import static com.moreroom.domain.cafe.entity.QCafe.cafe;
import static com.moreroom.domain.theme.entity.QTheme.theme;

import com.moreroom.domain.cafe.dto.Response.CafeListComponentDto;
import com.moreroom.domain.cafe.dto.Response.CafeListResponseDto;
import com.moreroom.domain.cafe.dto.Response.CafeSearchNameResponseDto;
import com.moreroom.domain.cafe.dto.Response.CafeSearchNameResponseDto.CafeSearchNameComponentDto;
import com.moreroom.domain.cafe.dto.Response.CafeThemeDetailResponseDto;
import com.moreroom.domain.cafe.dto.request.CafeListRequestDto;
import com.moreroom.domain.cafe.entity.Cafe;
import com.moreroom.global.repository.QuerydslRepositoryCustom;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
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
        List<CafeListComponentDto> results = jpaQueryFactory
            .select(Projections.constructor(CafeListComponentDto.class,
                cafe.cafeId, cafe.brand.brandId, cafe.region.regionId, cafe.address,
                cafe.cafeName, cafe.latitude, cafe.latitude, theme.themeId.count().intValue()))
            .from(cafe)
            .leftJoin(theme).on(cafe.cafeId.eq(theme.cafe.cafeId))
            .where(ce(c.getCafeName(), "cafeName", "like"),
                c.getBrandId() == null || c.getBrandId().isEmpty() ? null
                    : cafe.brand.brandId.in(c.getBrandId()),
                c.getRegion() == null ? null : cafe.region.regionId.eq(c.getRegion()))
            .groupBy(cafe)
            .fetch();

        return CafeListResponseDto.builder()
            .cafeList(results)
            .build();
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
