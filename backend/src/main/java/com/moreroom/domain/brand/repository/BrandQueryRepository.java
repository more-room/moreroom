package com.moreroom.domain.brand.repository;

import static com.moreroom.domain.brand.entity.QBrand.brand;
import static com.moreroom.domain.cafe.entity.QCafe.cafe;

import com.moreroom.domain.brand.entity.Brand;
import com.moreroom.global.repository.QuerydslRepositoryCustom;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class BrandQueryRepository extends QuerydslRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    public BrandQueryRepository(JPAQueryFactory jpaQueryFactory) {
        super(brand);
        this.jpaQueryFactory = jpaQueryFactory;
    }

    public List<Brand> findAllByBrandNameOrderByCafeCountDesc(String keyword) {
        List<Brand> results = jpaQueryFactory
            .select(brand)
            .from(brand)
            .leftJoin(cafe).on(cafe.brand.brandId.eq(brand.brandId))
            .where(ce(keyword, "brandName", "like"))
            .groupBy(brand)
            .orderBy(cafe.count().desc())
            .fetch();

        return results;
    }
}
