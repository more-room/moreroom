package com.moreroom.domain.cafe.controller;

import com.moreroom.domain.cafe.dto.Response.CafeSearchNameResponseDto;
import com.moreroom.domain.cafe.entity.Cafe;
import com.moreroom.domain.cafe.exception.CafeNotFoundException;
import com.moreroom.domain.cafe.service.CafeService;
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
@RequestMapping("/cafe")
public class CafeController {

    private final FindMemberService findMemberService;
    private final CafeService cafeService;

    @GetMapping("/{cafeId}")
    public ResponseEntity<Cafe> cafeDetail() {

        return new ResponseEntity<>(HttpStatus.OK);
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
