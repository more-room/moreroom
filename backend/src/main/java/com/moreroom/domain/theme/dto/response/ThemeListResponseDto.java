package com.moreroom.domain.theme.dto.response;

import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Builder
@Getter
public class ThemeListResponseDto {

    List<ThemeListComponentDto> themeList;

    @Builder
    @Getter
    @Setter
    public static class ThemeListComponentDto {
        private Integer themeId;
        private String title;
        private String poster;
        private Integer playtime;
        private List<String> genreList;
        private String regionId;
        private ThemeReviewResponseDto review;
        private ThemeCafeResponseDto cafe;
        private ThemeMemberResponseDto member;
    }
}