package com.moreroom.domain.theme.dto.response;

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
    private String level;
    private Integer price;
    private String description;
    private Double memberLevel;
    private ThemeReviewResponseDto review;
    private List<String> genreList;
    private ThemeMemberResponseDto member;
}
