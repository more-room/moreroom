package com.moreroom.domain.history.repository;

import static com.moreroom.domain.cafe.entity.QCafe.cafe;
import static com.moreroom.domain.history.entity.QHistory.history;
import static com.moreroom.domain.theme.entity.QTheme.theme;

import com.moreroom.domain.cafe.entity.Cafe;
import com.moreroom.domain.history.dto.response.HistoryListResponseDto;
import com.moreroom.domain.history.dto.response.HistoryListResponseDto.HistoryListComponentDto;
import com.moreroom.domain.history.dto.response.HistoryListResponseDto.HistoryListComponentDto.HistoryListThemeDto;
import com.moreroom.domain.history.entity.History;
import com.moreroom.domain.history.exception.HistoryNotFoundException;
import com.moreroom.domain.theme.entity.Theme;
import com.moreroom.global.repository.QuerydslRepositoryCustom;
import com.moreroom.global.util.StringUtil;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class HistoryQueryRepository extends QuerydslRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    public HistoryQueryRepository(JPAQueryFactory jpaQueryFactory) {
        super(theme);
        this.jpaQueryFactory = jpaQueryFactory;
    }

    public HistoryListResponseDto findHistoriesByDate(Long memberId, LocalDateTime startDate,
        LocalDateTime endDate) {
        List<Tuple> results = jpaQueryFactory
            .select(
                history, theme, cafe
            )
            .from(history)
            .leftJoin(theme).on(history.theme.themeId.eq(theme.themeId))
            .leftJoin(cafe).on(theme.cafe.cafeId.eq(cafe.cafeId))
            .where(
                history.member.memberId.eq(memberId),
                startDate == null ? null : history.playDate.after(startDate),
                endDate == null ? null : history.playDate.before(endDate)
            )
            .fetch();

        List<HistoryListComponentDto> list = new ArrayList<>();
        for (Tuple t : results) {
            History h = t.get(0, History.class);
            Theme th = t.get(1, Theme.class);
            Cafe c = t.get(2, Cafe.class);

            assert th != null;
            assert c != null;
            list.add(HistoryListComponentDto.builder()
                .historyId(h.getHistoryId())
                .date(StringUtil.dateToString(h.getPlayDate()))
                .memberPlayTime(h.getMemberPlayTime())
                .hintCount(h.getHintCount())
                .updatedAt(StringUtil.dateToString(h.getUpdatedAt()))
                .theme(HistoryListThemeDto.builder()
                    .themeId(th.getThemeId())
                    .title(th.getTitle())
                    .cafeName(c.getCafeName())
                    .poster(th.getPoster())
                    .build())
                .build()
            );
        }

        return HistoryListResponseDto.builder()
            .historyList(list)
            .build();
    }


    public HistoryListComponentDto findHistoryDetail(Long memberId, Long historyId) {
        Tuple t = jpaQueryFactory
            .select(
                history, cafe
            )
            .from(history)
            .leftJoin(cafe).on(history.theme.cafe.cafeId.eq(cafe.cafeId))
            .where(
                history.historyId.eq(historyId),
                history.member.memberId.eq(memberId)
            )
            .fetchFirst();

        if (t == null) {
            throw new HistoryNotFoundException();
        }

        History h = t.get(0, History.class);
        Cafe c = t.get(1, Cafe.class);

        assert h != null;
        assert c != null;
        return HistoryListComponentDto.builder()
            .historyId(h.getHistoryId())
            .themeId(h.getTheme().getThemeId())
            .date(StringUtil.dateToString(h.getPlayDate()))
            .hintCount(h.getHintCount())
            .content(h.getContent())
            .memberLevel(h.getMemberLevel())
            .memberPlayTime(h.getMemberPlayTime())
            .players(h.getPlayers())
            .price(h.getPrice())
            .successFlag(h.isSuccessFlag())
            .updatedAt(StringUtil.dateToString(h.getUpdatedAt()))
            .cafeName(c.getCafeName())
            .build();
    }
}
