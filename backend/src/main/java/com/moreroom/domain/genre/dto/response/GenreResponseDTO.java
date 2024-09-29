package com.moreroom.domain.genre.dto.response;

import com.moreroom.domain.genre.entity.Genre;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GenreResponseDTO {
    private String genreName;

    public static GenreResponseDTO toDTO(Genre genre) {
        return GenreResponseDTO.builder()
            .genreName(genre.getGenreName())
            .build();
    }
}
