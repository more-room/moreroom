package com.moreroom.global.controller;

import com.moreroom.domain.genre.dto.response.GenreInfoResponseDto;
import com.moreroom.domain.genre.service.GenreInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/info")
public class InfoController {

    private final GenreInfoService genreInfoService;


    @GetMapping("/genre")
    public ResponseEntity<?> getGenreList() {
        GenreInfoResponseDto genreInfoResponseDto = genreInfoService.getGenreList();
        if (genreInfoResponseDto != null) {
            return new ResponseEntity<>(genreInfoResponseDto, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
