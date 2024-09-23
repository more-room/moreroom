package com.moreroom.domain.theme.dto.response;

import com.moreroom.domain.theme.entity.Theme;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ThemeDetailResponseDto {

    private ThemeComponentResponseDto theme;

    public static ThemeDetailResponseDto toDto(Theme theme, long reviewCount, Double reviewScore,
        Boolean playFlag, List<String> genreList) {
        return ThemeDetailResponseDto.builder()
            .theme(ThemeComponentResponseDto.toDto(theme, reviewCount, reviewScore, playFlag,
                genreList))
            .build();
    }
}
