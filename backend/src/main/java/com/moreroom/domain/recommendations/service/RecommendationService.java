package com.moreroom.domain.recommendations.service;

import com.moreroom.domain.recommendations.entity.SimilarMemberTheme;
import com.moreroom.domain.recommendations.repository.SimilarMemberThemeRepository;
import com.moreroom.domain.theme.dto.response.ThemeListResponseDto;
import com.moreroom.domain.theme.repository.ThemeQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final SimilarMemberThemeRepository similarMemberThemeRepository;
    private final ThemeQueryRepository themeQueryRepository;

    public ThemeListResponseDto getSimilarUserThemes(long memberId) {
        SimilarMemberTheme similarMemberTheme = similarMemberThemeRepository.findByMemberId(6L);
        ThemeListResponseDto themeListResponseDto = themeQueryRepository.findByThemeIds(
            similarMemberTheme.getSimilarMemberThemes(), memberId);
        System.out.println("similarMemberTheme = " + similarMemberTheme);
        return themeListResponseDto;
    }
}
