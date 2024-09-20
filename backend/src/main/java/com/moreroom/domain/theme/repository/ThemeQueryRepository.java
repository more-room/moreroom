package com.moreroom.domain.theme.repository;

import static com.moreroom.domain.theme.entity.QTheme.theme;

import com.moreroom.domain.theme.dto.request.ThemeListRequestDto;
import com.moreroom.domain.theme.entity.Theme;
import com.moreroom.global.repository.QuerydslRepositoryCustom;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.query.Page;
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

    public Page findAllByFilter(ThemeListRequestDto themeListRequestDto, PageRequest pageRequest) {
        List<Theme> content = jpaQueryFactory
            .selectFrom(theme)
            .fetch();
        System.out.println("content = " + content);
        return null;
    }
}
