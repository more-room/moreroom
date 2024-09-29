package com.moreroom.domain.theme.dto.response;

import com.moreroom.domain.theme.entity.Theme;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ThemeMyPageReviewResponseDto {
    private Integer themeId;
    private String title;
    private Integer playtime;
    private List<String> genreList;
    private String poster;

    public static ThemeMyPageReviewResponseDto toDTO(Theme theme, List<String> genreList) {
        return ThemeMyPageReviewResponseDto.builder()
            .themeId(theme.getThemeId())
            .title(theme.getTitle())
            .playtime(theme.getPlaytime())
            .genreList(genreList)
            .poster(theme.getPoster())
            .build();
    }
}
