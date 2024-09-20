package com.moreroom.domain.theme.dto.response;

import com.moreroom.domain.theme.dto.response.ThemeDetailResponseDto.ThemeDetailThemeDto.ThemeDetailReviewDto;
import com.moreroom.domain.theme.entity.Theme;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
public class ThemeDetailResponseDto {

    private ThemeDetailThemeDto theme;
    private ThemeDetailMemberDto member;

    public static ThemeDetailResponseDto toDto(Theme theme, Integer reviewCount, Double reviewScore,
        Boolean playFlag) {
        return ThemeDetailResponseDto.builder()
            .theme(ThemeDetailThemeDto.builder()
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
                .review(ThemeDetailReviewDto.builder()
                    .count(reviewCount)
                    .score(reviewScore)
                    .build())
                .build())
            .member(ThemeDetailMemberDto.builder()
                .playFlag(playFlag)
                .build())
            .build();
    }

    @Builder
    @Getter
    static public class ThemeDetailThemeDto {

        private Integer themeId;
        private String poster;
        private String title;
        private Integer playtime;
        private Integer minPeople;
        private Integer maxPeople;
        private String level;
        private Integer price;
        private String description;
        private Double memberLevel;
        private ThemeDetailReviewDto review;

        @Builder
        @Getter
        static public class ThemeDetailReviewDto {

            private Integer count;
            private Double score;
        }
    }

    @Builder
    @Getter
    static public class ThemeDetailMemberDto {

        private Boolean playFlag;
    }
}
