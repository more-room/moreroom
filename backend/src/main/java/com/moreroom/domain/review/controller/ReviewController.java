package com.moreroom.domain.review.controller;

import com.moreroom.domain.review.dto.request.ReviewRequestDTO;
import com.moreroom.domain.review.dto.request.ReviewUpdateRequestDTO;
import com.moreroom.domain.review.entity.Review;
import com.moreroom.domain.review.service.ReviewService;
import com.moreroom.global.dto.PageResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/member")
    public ResponseEntity<PageResponseDto> reviewListByMine(
        @RequestParam(name = "pageNumber", required = false, defaultValue = "0") Integer pageNumber,
        @RequestParam(name = "pageSize", required = false, defaultValue = "10") Integer pageSize,
        @RequestParam(name = "sortOrder", required = false, defaultValue = "desc") String sortOrder,
        @RequestParam(name = "sortBy", required = false, defaultValue = "date") String sortBy) {

        PageResponseDto reviewList = reviewService.findAllByMine(pageNumber, pageSize);

        return new ResponseEntity<>(reviewList, HttpStatus.OK);
    }

    @PatchMapping("/{reviewId}")
    public ResponseEntity<Review> updateReview(@PathVariable("reviewId") Long reviewId,
        @RequestBody ReviewUpdateRequestDTO reviewUpdateRequestDTO) {

        reviewService.update(reviewId, reviewUpdateRequestDTO);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Review> deleteReview(@PathVariable("reviewId") Long reviewId) {
        reviewService.delete(reviewId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/thumbsUp/{reviewId}")
    public ResponseEntity<Review> thumbsUpReview(@PathVariable("reviewId") Long reviewId) {

        reviewService.like(reviewId);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
