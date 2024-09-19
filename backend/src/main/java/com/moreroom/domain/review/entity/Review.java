package com.moreroom.domain.review.entity;

import com.moreroom.global.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    @Column(nullable = false)
    private Long memberId;
    @Column(nullable = false)
    private Integer themeId;
    private String content;
    @Column(nullable = false)
    private float score;
    @LastModifiedDate
    private LocalDateTime updatedAt;
    @Builder.Default
    private boolean delFlag = false;
    @Builder.Default
    private Integer thumbsUp = 0;
}
