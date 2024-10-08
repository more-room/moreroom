package com.moreroom.domain.theme.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Builder
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ThemeListResponseDto {

    List<ThemeListComponentDto> themeList;
    RegionComponentDto region;

    @Builder
    @Getter
    @Setter
    @JsonInclude(JsonInclude.Include.NON_NULL) // null 제외
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

        public void setGenreList(List<String> genreList) {
            this.genreList = genreList;
        }

        public void setReview(ThemeReviewResponseDto review) {
            this.review = review;
        }
    }

    @Builder
    @Getter
    public static class RegionComponentDto {

        String regionName;
        String regionParentName;
    }
}
