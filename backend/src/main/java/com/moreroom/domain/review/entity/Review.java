package com.moreroom.domain.review.entity;

import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.review.dto.request.ReviewUpdateRequestDTO;
import com.moreroom.domain.theme.entity.Theme;
import com.moreroom.global.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.LastModifiedDate;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@SuperBuilder
public class Review extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberId", nullable = false)
    private Member member;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "themeId", nullable = false)
    private Theme theme;
    private String content;
    @Column(nullable = false)
    private Float score;
    @LastModifiedDate
    private LocalDateTime updatedAt;
    @Builder.Default
    private boolean delFlag = false;
    @Builder.Default
    private Integer thumbsUp = 0;


    public void updateReview(ReviewUpdateRequestDTO reviewUpdateRequestDTO) {
        this.content = reviewUpdateRequestDTO.getContent();
        this.score = reviewUpdateRequestDTO.getScore();
    }

    public void deleteReview() {
        this.delFlag = true;
    }

    public void likeReview() {
        this.thumbsUp += 1;
    }

    public void unlikeReview() {
        this.thumbsUp -= 1;
    }
}
