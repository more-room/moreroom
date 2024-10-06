package com.moreroom.domain.externalReview.controller;

import com.moreroom.domain.externalReview.service.ExternalReviewService;
import com.moreroom.domain.review.exception.ReviewNotFoundException;
import com.moreroom.global.dto.PageResponseDto;
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
@RequestMapping("/external-review")
public class ExternalReviewController {

    private final FindMemberService findMemberService;
    private final ExternalReviewService externalReviewService;

    @GetMapping()
    public ResponseEntity<PageResponseDto> getExternalReviewByThemeId(
        @RequestParam(name = "themeId") Integer themeId,
        @RequestParam(name = "pageNumber", required = false) Integer pageNumber,
        @RequestParam(name = "pageSize", required = false) Integer pageSize) {
        long memberId = findMemberService.findCurrentMember();
        PageResponseDto responseDto = externalReviewService.getExternalReviewByThemeId(themeId,
            pageNumber, pageSize);
        if (responseDto == null) {
            throw new ReviewNotFoundException();
        }
        return new ResponseEntity<>(responseDto, HttpStatus.OK)
            ;
    }
}
