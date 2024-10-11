package com.moreroom.domain.genre.dto.response;

import com.moreroom.domain.genre.entity.Genre;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class GenreInfoResponseDto {

    List<GenreInfoComponentDto> genreList;

    public static GenreInfoResponseDto toDto(List<Genre> gl) {
        List<GenreInfoComponentDto> result = gl.stream().map(GenreInfoComponentDto::toDto).toList();
        return GenreInfoResponseDto.builder()
            .genreList(result)
            .build();
    }

}
