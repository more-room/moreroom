package com.moreroom.domain.review.dto.response;

import com.moreroom.domain.member.dto.response.MemberReviewResponseDTO;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.review.entity.Review;
import java.time.format.DateTimeFormatter;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReviewResponseDTO {
    private Long reviewId;
    private MemberReviewResponseDTO member;
    private String content;
    private Float score;
    private Integer thumbsUp;
    private String createdAt;
    private Boolean upFlag;

    public static ReviewResponseDTO toDTO(Review review, boolean upFlag) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        Member member = review.getMember();

        return ReviewResponseDTO.builder()
            .reviewId(review.getReviewId())
            .member(MemberReviewResponseDTO.toDTO(member))
            .content(review.getContent())
            .score(review.getScore())
            .thumbsUp(review.getThumbsUp())
            .createdAt(review.getCreatedAt().format(formatter))
            .upFlag(upFlag)
            .build();
    }
}
