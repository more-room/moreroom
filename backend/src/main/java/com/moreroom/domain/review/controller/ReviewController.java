package com.moreroom.domain.review.controller;

import com.moreroom.domain.review.dto.request.ReviewRequestDTO;
import com.moreroom.domain.review.entity.Review;
import com.moreroom.domain.review.service.ReviewService;
import com.moreroom.global.dto.PageResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/review")
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("")
    public ResponseEntity<Review> addReview(@RequestBody ReviewRequestDTO reviewRequestDTO) {

        reviewService.save(reviewRequestDTO);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<PageResponseDto> reviewList(@RequestParam(name = "themeId", required = true) Integer themeId,
                                            @RequestParam(name = "pageNumber", required = false, defaultValue = "0") Integer pageNumber,
                                            @RequestParam(name = "pageSize", required = false, defaultValue = "10") Integer pageSize,
                                            @RequestParam(name = "sortOrder", required = false, defaultValue = "desc") String sortOrder,
                                            @RequestParam(name = "sortBy", required = false, defaultValue = "date") String sortBy) {

        PageResponseDto reviewList = reviewService.findAll(themeId, pageNumber, pageSize);

        return new ResponseEntity<>(reviewList, HttpStatus.OK);
    }
}
