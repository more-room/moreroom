package com.moreroom.domain.review.dto.response;

import com.moreroom.domain.review.entity.Review;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReviewResponseDTO {
    private Long reviewId;
    private String content;
    private Float score;
    private Integer thumbsUp;
    private String updatedAt;

    public static ReviewResponseDTO toDTO(Review review) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        return ReviewResponseDTO.builder()
            .reviewId(review.getReviewId())
            .content(review.getContent())
            .score(review.getScore())
            .thumbsUp(review.getThumbsUp())
            .updatedAt(review.getUpdatedAt().format(formatter))
            .build();
    }
}
