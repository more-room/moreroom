package com.moreroom.domain.recommendations.service;

import com.moreroom.domain.history.entity.History;
import com.moreroom.domain.history.exception.HistoryNotFoundException;
import com.moreroom.domain.history.repository.HistoryRepository;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.member.exception.MemberNotFoundException;
import com.moreroom.domain.member.repository.MemberRepository;
import com.moreroom.domain.recommendations.entity.DemographicsTheme;
import com.moreroom.domain.recommendations.entity.SimilarMemberTheme;
import com.moreroom.domain.recommendations.entity.SimilarTheme;
import com.moreroom.domain.recommendations.repository.DemographicsThemeRepository;
import com.moreroom.domain.recommendations.repository.SimilarMemberThemeRepository;
import com.moreroom.domain.recommendations.repository.SimilarThemeRepository;
import com.moreroom.domain.theme.dto.response.ThemeListResponseDto;
import com.moreroom.domain.theme.repository.ThemeQueryRepository;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final SimilarMemberThemeRepository similarMemberThemeRepository;
    private final SimilarThemeRepository similarThemeRepository;
    private final DemographicsThemeRepository demographicsThemeRepository;
    private final ThemeQueryRepository themeQueryRepository;
    private final MemberRepository memberRepository;
    private final HistoryRepository historyRepository;

    public ThemeListResponseDto getSimilarUserThemes(long memberId) {
        // 1. 유사 유저 테마 조회 (mongoDB)
        SimilarMemberTheme similarMemberTheme = similarMemberThemeRepository.findByMemberId(6L);
        // 2. 테마 상세 정보 조회
        ThemeListResponseDto themeListResponseDto = themeQueryRepository.findByThemeIds(
            similarMemberTheme.getSimilarMemberThemes(), memberId);
        System.out.println("similarMemberTheme = " + similarMemberTheme);
        return themeListResponseDto;
    }


    public ThemeListResponseDto getSimilarThemes(long memberId) {
        // 1. 마지막 방문 테마 조회
        History history = historyRepository.findTop1ByMemberMemberIdOrderByPlayDateDesc(memberId)
            .orElseThrow(
                HistoryNotFoundException::new);
        Integer themeId = history.getTheme().getThemeId();
        System.out.println("lastVisitedThemeId = " + themeId);
        // 2. 유사 테마 조회 (mongoDB)
        SimilarTheme similarTheme = similarThemeRepository.findByThemeId(themeId);
        // 3. 테마 상세 정보 조회
        ThemeListResponseDto themeListResponseDto = themeQueryRepository.findByThemeIds(
            similarTheme.getSimilarThemes(), memberId);

        return themeListResponseDto;
    }

    public ThemeListResponseDto getDemographicsThemes(Long memberId) {
        // 1. 유저 정보 조회
        Member member = memberRepository.findById(memberId)
            .orElseThrow(MemberNotFoundException::new);
        String groupId = String.format("%d_%d",
            (LocalDate.now().getYear() - member.getBirth().getYear()) / 10 * 10,
            member.getGender() ? 1 : 0);
        // 2. 인기 테마 조회 (mongoDB)
        DemographicsTheme demographicsTheme = demographicsThemeRepository.findByGroupId(groupId);
        // 3. 테마 상세 정보 조회
        ThemeListResponseDto themeListResponseDto = themeQueryRepository.findByThemeIds(
            demographicsTheme.getDemographicThemes(), memberId);

        return themeListResponseDto;
    }
}
