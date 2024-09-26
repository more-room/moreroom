package com.moreroom.domain.cafe.controller;

import com.moreroom.domain.cafe.dto.Response.CafeListResponseDto;
import com.moreroom.domain.cafe.dto.Response.CafeSearchNameResponseDto;
import com.moreroom.domain.cafe.dto.Response.CafeThemeDetailResponseDto;
import com.moreroom.domain.cafe.dto.request.CafeListRequestDto;
import com.moreroom.domain.cafe.entity.Cafe;
import com.moreroom.domain.cafe.exception.CafeNotFoundException;
import com.moreroom.domain.cafe.service.CafeService;
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
@RequestMapping("/cafe")
public class CafeController {

    private final FindMemberService findMemberService;
    private final CafeService cafeService;

    @GetMapping()
    public ResponseEntity<CafeListResponseDto> getCafesByFilter(
        CafeListRequestDto cafeListRequestDto
    ) {
        long memberId = findMemberService.findCurrentMember();
        CafeListResponseDto cafeListResponseDto = cafeService.findCafes(cafeListRequestDto);
        if (cafeListResponseDto == null) {
            throw new CafeNotFoundException();
        }
        return new ResponseEntity<>(cafeListResponseDto, HttpStatus.OK);
    }

    @GetMapping("/{cafeId}")
    public ResponseEntity<Cafe> cafeDetail() {

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/theme/{themeId}")
    public ResponseEntity<?> getCafeDetailByTheme(@PathVariable(name = "themeId") Integer themeId) {
        long memberId = findMemberService.findCurrentMember();

        CafeThemeDetailResponseDto cafeThemeDetailResponseDto = cafeService.findCafeByThemeId(
            themeId);
        if (cafeThemeDetailResponseDto == null) {
            throw new CafeNotFoundException();
        }
        return new ResponseEntity<>(cafeThemeDetailResponseDto, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<CafeSearchNameResponseDto> getCafesByName(
        @RequestParam(required = false) String name
    ) {
        long memberId = findMemberService.findCurrentMember();
        CafeSearchNameResponseDto cafeSearchNameResponseDto = cafeService.findCafeByName(name);

        if (cafeSearchNameResponseDto == null) {
            throw new CafeNotFoundException();
        }

        return new ResponseEntity<>(cafeSearchNameResponseDto, HttpStatus.OK);

    }
}
