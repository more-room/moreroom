package com.moreroom.domain.theme.dto.response;

import com.moreroom.domain.theme.entity.Theme;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ThemeComponentResponseDto {

    private Integer themeId;
    private String poster;
    private String title;
    private Integer playtime;
    private Integer minPeople;
    private Integer maxPeople;
    private Integer level;
    private Integer price;
    private String description;
    private Double memberLevel;
    private ThemeReviewResponseDto review;
    private List<String> genreList;
    private ThemeMemberResponseDto member;


    public static ThemeComponentResponseDto toDto(Theme theme, long reviewCount, Double reviewScore,
        Boolean playFlag, List<String> genreList) {
        Integer level = Integer.valueOf(theme.getLevel());
        Double userLevel = theme.getUserLevel() != null ? theme.getUserLevel() : level;
        return ThemeComponentResponseDto.builder()
            .themeId(theme.getThemeId())
            .poster(theme.getPoster())
            .title(theme.getTitle())
            .playtime(theme.getPlaytime())
            .minPeople(theme.getMinPeople())
            .maxPeople(theme.getMaxPeople())
            .level(level)
            .price(theme.getPrice())
            .description(theme.getDescription())
            .memberLevel(userLevel)
            .review(ThemeReviewResponseDto.builder()
                .count(reviewCount)
                .score(reviewScore)
                .build())
            .member(ThemeMemberResponseDto.builder()
                .playFlag(playFlag)
                .build())
            .genreList(genreList)
            .build();
    }
}
