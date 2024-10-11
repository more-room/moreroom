package com.moreroom.domain.recommendations.dto.response;

import com.moreroom.domain.theme.dto.response.ThemeListResponseDto.ThemeListComponentDto;
import java.util.List;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Getter
@Builder
public class GenreThemeResponseDto {

    List<ThemeListComponentDto> mostGenreList;
    List<ThemeListComponentDto> leastGenreList;
}
