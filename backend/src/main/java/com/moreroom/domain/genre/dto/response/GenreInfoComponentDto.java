package com.moreroom.domain.genre.dto.response;

import com.moreroom.domain.genre.entity.Genre;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class GenreInfoComponentDto {

    private Integer genreId;
    private String genreName;

    public static GenreInfoComponentDto toDto(Genre genre) {
        return GenreInfoComponentDto.builder()
            .genreId(genre.getGenreId())
            .genreName(genre.getGenreName())
            .build();
    }
}
