package com.moreroom.domain.review.dto.response;

import com.moreroom.domain.cafe.dto.Response.CafeReviewResponseDTO;
import com.moreroom.domain.cafe.entity.Cafe;
import com.moreroom.domain.member.dto.response.MemberReviewResponseDTO;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.review.entity.Review;
import com.moreroom.domain.theme.dto.response.ThemeMyPageReviewResponseDto;
import com.moreroom.domain.theme.entity.Theme;
import java.time.format.DateTimeFormatter;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReviewMyPageResponseDTO {
    private Long reviewId;
    private String content;
    private Float score;
    private Integer thumbsUp;
    private MemberReviewResponseDTO member;
    private ThemeMyPageReviewResponseDto theme;
    private CafeReviewResponseDTO cafe;
    private String createdAt;

    public static ReviewMyPageResponseDTO toDTO(Review review, List<String> genreNameList) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        Member member = review.getMember();
        Theme theme = review.getTheme();
        Cafe cafe = theme.getCafe();

        return ReviewMyPageResponseDTO.builder()
            .reviewId(review.getReviewId())
            .content(review.getContent())
            .score(review.getScore())
            .thumbsUp(review.getThumbsUp())
            .member(MemberReviewResponseDTO.toDTO(member))
            .theme(ThemeMyPageReviewResponseDto.toDTO(theme, genreNameList))
            .cafe(CafeReviewResponseDTO.toDTO(cafe))
            .createdAt(review.getCreatedAt().format(formatter))
            .build();
    }
}
