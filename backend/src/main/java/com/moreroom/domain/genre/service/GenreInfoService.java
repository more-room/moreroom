package com.moreroom.domain.genre.service;

import com.moreroom.domain.genre.dto.response.GenreInfoResponseDto;
import com.moreroom.domain.genre.repository.GenreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class GenreInfoService {

    private final GenreRepository genreRepository;

    public GenreInfoResponseDto getGenreList() {
        return GenreInfoResponseDto.toDto(genreRepository.findAll());
    }

}
