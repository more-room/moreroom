package com.moreroom.global.controller;

import com.moreroom.domain.brand.dto.response.BrandInfoResponseDto;
import com.moreroom.domain.brand.service.BrandInfoService;
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
    private final BrandInfoService brandInfoService;


    @GetMapping("/genre")
    public ResponseEntity<GenreInfoResponseDto> getGenreList() {
        GenreInfoResponseDto genreInfoResponseDto = genreInfoService.getGenreList();
        if (genreInfoResponseDto != null) {
            return new ResponseEntity<>(genreInfoResponseDto, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/brand")
    public ResponseEntity<?> getBrandList() {
        BrandInfoResponseDto brandInfoResponseDto = brandInfoService.getBrandList();
        if (brandInfoResponseDto != null) {
            return new ResponseEntity<>(brandInfoResponseDto, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
