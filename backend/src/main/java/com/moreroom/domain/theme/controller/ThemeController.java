package com.moreroom.domain.theme.controller;

import com.moreroom.domain.theme.dto.response.ThemeDetailResponseDto;
import com.moreroom.domain.theme.service.ThemeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/theme")
public class ThemeController {

    private final ThemeService themeService;

    @GetMapping("/{themeId}")
    public ResponseEntity<ThemeDetailResponseDto> getThemeById(
        @PathVariable(name = "themeId") Integer themeId) {
        // Todo: memberId 연결
        ThemeDetailResponseDto themeDetailResponseDto = themeService.findThemeById(themeId, 4L);
//        System.out.println(userDetails.toString());
        if (themeDetailResponseDto != null) {
            return new ResponseEntity<>(themeDetailResponseDto,
                HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping()
    public ResponseEntity<?> getThemesByFilter() {

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
