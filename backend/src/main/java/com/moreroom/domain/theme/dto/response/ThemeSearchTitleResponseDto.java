package com.moreroom.domain.theme.dto.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ThemeSearchTitleResponseDto {

    List<ThemeSearchTitleComponentResponseDto> themeList;

    @Builder
    @Getter
    @AllArgsConstructor
    public static class ThemeSearchTitleComponentResponseDto {

        private Integer themeId;
        private String title;
    }
}
