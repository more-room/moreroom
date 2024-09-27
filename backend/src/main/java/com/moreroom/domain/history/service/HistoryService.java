package com.moreroom.domain.history.service;

import com.moreroom.domain.history.dto.request.HistoryRequestDto;
import com.moreroom.domain.history.dto.request.HistoryUpdateRequestDto;
import com.moreroom.domain.history.dto.response.HistoryListResponseDto;
import com.moreroom.domain.history.dto.response.HistoryListResponseDto.HistoryListComponentDto;
import com.moreroom.domain.history.entity.History;
import com.moreroom.domain.history.exception.HistoryInvalidParameterException;
import com.moreroom.domain.history.exception.HistoryNotFoundException;
import com.moreroom.domain.history.repository.HistoryQueryRepository;
import com.moreroom.domain.history.repository.HistoryRepository;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.member.repository.MemberRepository;
import com.moreroom.domain.review.repository.ReviewRepository;
import com.moreroom.domain.theme.entity.Theme;
import com.moreroom.domain.theme.repository.ThemeRepository;
import com.moreroom.global.util.StringUtil;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class HistoryService {

    private final HistoryRepository historyRepository;
    private final HistoryQueryRepository historyQueryRepository;
    private final MemberRepository memberRepository;
    private final ThemeRepository themeRepository;
    private final ReviewRepository reviewRepository;

    public HistoryListResponseDto findHistoriesByDate(Long memberId, String startDate,
        String endDate) {
        return historyQueryRepository.findHistoriesByDate(memberId,
            StringUtil.stringToDate(startDate), StringUtil.stringToDate(endDate));
    }

    public HistoryListComponentDto findHistoryDetail(Long memberId, Long historyId) {
        return historyQueryRepository.findHistoryDetail(memberId, historyId);
    }

    @Transactional
    public Boolean saveHistory(Long memberId, HistoryRequestDto historyRequestDto) {
        Member member = memberRepository.getReferenceById(memberId); // lazy loading
        Theme theme = themeRepository.getReferenceById(historyRequestDto.getThemeId());
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime playDate = StringUtil.stringToDate(historyRequestDto.getDate());

        History history = History.builder()
            .member(member)
            .theme(theme)
            .memberPlayTime(historyRequestDto.getMemberPlayTime())
            .price(historyRequestDto.getPrice())
            .hintCount(historyRequestDto.getHintCount())
            .content(historyRequestDto.getContent())
            .memberLevel(historyRequestDto.getMemberLevel())
            .createdAt(now)
            .updatedAt(now)
            .delFlag(false)
            .players(historyRequestDto.getPlayers())
            .successFlag(historyRequestDto.getSuccessFlag())
            .playDate(playDate)
            .build();

        try {
            historyRepository.save(history);
        } catch (DataIntegrityViolationException e) {
            throw new HistoryInvalidParameterException();
        }
        return true;
    }


    @Transactional
    public Boolean updateHistory(Long memberId, Long historyId,
        HistoryUpdateRequestDto historyUpdateRequestDto) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime playDate = StringUtil.stringToDate(historyUpdateRequestDto.getDate());

        History history = historyRepository.findByHistoryIdAndMemberMemberId(historyId, memberId)
            .orElseThrow(
                HistoryNotFoundException::new);

        history.changeHistory(
            historyUpdateRequestDto.getMemberPlayTime(),
            historyUpdateRequestDto.getPrice(),
            historyUpdateRequestDto.getHintCount(),
            historyUpdateRequestDto.getContent(),
            historyUpdateRequestDto.getMemberLevel(),
            historyUpdateRequestDto.getPlayers(),
            historyUpdateRequestDto.getSuccessFlag(),
            playDate,
            now
        );
        return true;
    }

}
