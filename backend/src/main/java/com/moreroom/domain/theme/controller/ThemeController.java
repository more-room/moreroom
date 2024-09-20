package com.moreroom.domain.theme.controller;

import com.moreroom.domain.theme.dto.request.ThemeListRequestDto;
import com.moreroom.domain.theme.dto.response.ThemeDetailResponseDto;
import com.moreroom.domain.theme.service.ThemeService;
import com.moreroom.global.util.FindMemberService;
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
    private final FindMemberService findMemberService;

    @GetMapping("/{themeId}")
    public ResponseEntity<ThemeDetailResponseDto> getThemeById(
        @PathVariable(name = "themeId") Integer themeId) {
        long memberId = findMemberService.findCurrentMember();
        ThemeDetailResponseDto themeDetailResponseDto = themeService.findThemeById(themeId,
            memberId);
        if (themeDetailResponseDto != null) {
            return new ResponseEntity<>(themeDetailResponseDto,
                HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping()
    public ResponseEntity<?> getThemesByFilter(ThemeListRequestDto themeListRequestDto) {
        themeListRequestDto.setDefaults();
        System.out.println("themeListRequestDto = " + themeListRequestDto.toString());
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
