package com.moreroom.domain.theme.controller;

import com.moreroom.domain.theme.dto.request.ThemeListRequestDto;
import com.moreroom.domain.theme.dto.response.ThemeDetailResponseDto;
import com.moreroom.domain.theme.dto.response.ThemeSearchTitleResponseDto;
import com.moreroom.domain.theme.exception.ThemeNotFoundException;
import com.moreroom.domain.theme.service.ThemeService;
import com.moreroom.global.dto.PageResponseDto;
import com.moreroom.global.util.FindMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

        if (themeDetailResponseDto == null) {
            throw new ThemeNotFoundException();
        }
        return new ResponseEntity<>(themeDetailResponseDto,
            HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<PageResponseDto> getThemesByFilter(
        ThemeListRequestDto themeListRequestDto) {
        long memberId = findMemberService.findCurrentMember();
        themeListRequestDto.setDefaults();
        PageResponseDto pageResponseDto = themeService.findThemes(themeListRequestDto, memberId);
        if (pageResponseDto == null) {
            throw new ThemeNotFoundException();
        }
        return new ResponseEntity<>(pageResponseDto,
            HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<ThemeSearchTitleResponseDto> getThemesByTitle(
        @RequestParam(required = false) String title) {
        System.out.println("ThemeController.getThemesByTitle");
        long memberId = findMemberService.findCurrentMember();
        System.out.println("title = " + title);
        ThemeSearchTitleResponseDto themeSearchTitleResponseDto = themeService.findThemesByTitle(
            title);
        if (themeSearchTitleResponseDto == null) {
            throw new ThemeNotFoundException();
        }
        return new ResponseEntity<>(themeSearchTitleResponseDto, HttpStatus.OK);
    }
}
