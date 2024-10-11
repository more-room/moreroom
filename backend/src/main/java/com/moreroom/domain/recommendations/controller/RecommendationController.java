package com.moreroom.domain.recommendations.controller;

import com.moreroom.domain.recommendations.dto.response.GenreThemeResponseDto;
import com.moreroom.domain.recommendations.service.RecommendationService;
import com.moreroom.domain.theme.dto.response.ThemeListResponseDto;
import com.moreroom.global.util.FindMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;
    private final FindMemberService findMemberService;

    @GetMapping("similar-user-themes")
    public ResponseEntity<ThemeListResponseDto> getSimilarUserThemes() {
        long memberId = findMemberService.findCurrentMember();
        ThemeListResponseDto themeListResponseDto = recommendationService.getSimilarUserThemes(
            memberId);
        if (themeListResponseDto != null) {
            return new ResponseEntity<>(themeListResponseDto,
                HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("similar-themes")
    public ResponseEntity<ThemeListResponseDto> getSimilarThemes() {
        long memberId = findMemberService.findCurrentMember();
        ThemeListResponseDto themeListResponseDto = recommendationService.getSimilarThemes(
            memberId);
        if (themeListResponseDto != null) {
            return new ResponseEntity<>(themeListResponseDto,
                HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("demographics-themes")
    public ResponseEntity<ThemeListResponseDto> getDemographicsThemes() {
        long memberId = findMemberService.findCurrentMember();
        ThemeListResponseDto themeListResponseDto = recommendationService.getDemographicsThemes(
            memberId);
        if (themeListResponseDto != null) {
            return new ResponseEntity<>(themeListResponseDto,
                HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("nearby-themes")
    public ResponseEntity<ThemeListResponseDto> getNearbyThemes(@RequestParam Double lat,
        @RequestParam Double lon) {
        long memberId = findMemberService.findCurrentMember();
        ThemeListResponseDto themeListResponseDto = recommendationService.getNearbyThemes(
            memberId, lat, lon);
        if (themeListResponseDto != null) {
            return new ResponseEntity<>(themeListResponseDto,
                HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


    @GetMapping("genres-themes")
    public ResponseEntity<GenreThemeResponseDto> getGenresThemes() {
        long memberId = findMemberService.findCurrentMember();
        GenreThemeResponseDto genreThemeResponseDto = recommendationService.getGenresThemes(
            memberId);
        if (genreThemeResponseDto != null) {
            return new ResponseEntity<>(genreThemeResponseDto,
                HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}