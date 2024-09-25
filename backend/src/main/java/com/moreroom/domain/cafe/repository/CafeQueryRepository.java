package com.moreroom.domain.cafe.repository;

import static com.moreroom.domain.cafe.entity.QCafe.cafe;

import com.moreroom.domain.cafe.dto.Response.CafeSearchNameResponseDto;
import com.moreroom.domain.cafe.dto.Response.CafeSearchNameResponseDto.CafeSearchNameComponentDto;
import com.moreroom.global.repository.QuerydslRepositoryCustom;
import com.querydsl.core.types.Projections;
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
