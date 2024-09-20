package com.moreroom.domain.theme.dto.response;

import com.moreroom.domain.theme.entity.Theme;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ThemeDetailResponseDto {

    private ThemeComponentResponseDto theme;


    public static ThemeDetailResponseDto toDto(Theme theme, Integer reviewCount, Double reviewScore,
        Boolean playFlag) {
        return ThemeDetailResponseDto.builder()
            .theme(ThemeComponentResponseDto.builder()
                .themeId(theme.getThemeId())
                .poster(theme.getPoster())
                .title(theme.getTitle())
                .playtime(theme.getPlaytime())
                .minPeople(theme.getMinPeople())
                .maxPeople(theme.getMaxPeople())
                .level(theme.getLevel())
                .price(theme.getPrice())
                .description(theme.getDescription())
                .memberLevel(theme.getUserLevel())
                .review(ThemeReviewResponseDto.builder()
                    .count(reviewCount)
                    .score(reviewScore)
                    .build())
                .member(ThemeMemberResponseDto.builder()
                    .playFlag(playFlag)
                    .build())
                .build())
            .build();
    }




}
