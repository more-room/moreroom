package com.moreroom.domain.theme.dto.response;

import java.util.List;

public class ThemeListResponseDto {

    List<ThemeListComponentDto> themeList;

    public static class ThemeListComponentDto {

        private Integer themeId;
        private String title;
        private String poster;
        private Integer playtime;
        private List<ThemeListComponentGenreDto> genreList;
        private String regionId;
        private ThemeReviewResponseDto review;
        private ThemeListComponentCafeDto cafe;
        private ThemeMemberResponseDto member;

        public static class ThemeListComponentGenreDto {

            private Integer id;
            private String name;
        }

        public static class ThemeListComponentReviewDto {

            private Integer count;
            private Double score;
        }

        public static class ThemeListComponentCafeDto {

            private Integer cafeId;
            private String brandName;
            private String branchName;
            private String cafeName;
            private String address;
        }

        public static class ThemeListComponentMemberDto {

            private boolean playFlag;
        }
    }
}
