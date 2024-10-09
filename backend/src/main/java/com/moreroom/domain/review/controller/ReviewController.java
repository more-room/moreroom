package com.moreroom.domain.review.controller;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.moreroom.domain.review.dto.request.ReviewRequestDTO;
import com.moreroom.domain.review.dto.request.ReviewUpdateRequestDTO;
import com.moreroom.domain.review.entity.Review;
import com.moreroom.domain.review.service.ReviewService;
import com.moreroom.global.dto.PageResponseDto;
import com.moreroom.global.util.FindMemberService;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
    private final FindMemberService findMemberService;

    @PostMapping()
    public ResponseEntity<Review> addReview(@RequestBody ReviewRequestDTO reviewRequestDTO) {

        reviewService.save(reviewRequestDTO);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<PageResponseDto> reviewList(
        @RequestParam(name = "themeId") Integer themeId,
                                            @RequestParam(name = "pageNumber", required = false, defaultValue = "0") Integer pageNumber,
                                            @RequestParam(name = "pageSize", required = false, defaultValue = "10") Integer pageSize,
                                            @RequestParam(name = "sortOrder", required = false, defaultValue = "desc") String sortOrder,
        @RequestParam(name = "sortBy", required = false, defaultValue = "createdAt") String sortBy) {
        Long memberId = findMemberService.findCurrentMember();
        PageResponseDto reviewList = reviewService.findAll(themeId, pageNumber, pageSize, sortOrder,
            sortBy, memberId);

        return new ResponseEntity<>(reviewList, HttpStatus.OK);
    }

    @GetMapping("/member")
    public ResponseEntity<PageResponseDto> reviewListByMine(
        @RequestParam(name = "pageNumber", required = false, defaultValue = "0") Integer pageNumber,
        @RequestParam(name = "pageSize", required = false, defaultValue = "10") Integer pageSize,
        @RequestParam(name = "sortOrder", required = false, defaultValue = "desc") String sortOrder,
        @RequestParam(name = "sortBy", required = false, defaultValue = "createdAt") String sortBy) {

        PageResponseDto reviewList = reviewService.findAllByMine(pageNumber, pageSize, sortOrder,
            sortBy);

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

    @PatchMapping("/thumbsup/{reviewId}")
    public ResponseEntity<Review> thumbsUpReview(@PathVariable("reviewId") Long reviewId) {

        reviewService.like(reviewId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/qr-verification")
    public ResponseEntity<byte[]> qrVerification(@RequestParam(name = "themeId") Integer themeId)
        throws WriterException, IOException {
        int width = 250;
        int height = 250;

        String url = "https://j11d206.p.ssafy.io/api/review/qr-verification?themeId=" + themeId;

        BitMatrix encode = new MultiFormatWriter()
            .encode(url, BarcodeFormat.QR_CODE, width, height);

        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();

            MatrixToImageWriter.writeToStream(encode, "PNG", out);

            return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(out.toByteArray());
        } catch (Exception e) {
            return null;
        }
    }

    @GetMapping("/qr-verification")
    public ResponseEntity<Void> redirectQrVerification(
        @RequestParam(name = "themeId") Integer themeId) {

        // 1. 매핑 데이터 생성
        reviewService.updatePlayLog(themeId);

        // 2. 테마 페이지로 리다이렉트 URL 설정
        String redirectUrl = "https://j11d206.p.ssafy.io/themes/" + themeId;

        // 3. 테마 페이지로 리다이렉트
        return ResponseEntity.status(HttpStatus.FOUND)
            .location(URI.create(redirectUrl))
            .build();
    }
}
