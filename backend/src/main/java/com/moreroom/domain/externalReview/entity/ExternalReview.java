package com.moreroom.domain.externalReview.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ExternalReview {
    @Id
    private Long externalReviewId;
    private Integer themeId;
    private String title;
    private String content;
    private LocalDate createdAt;
    private String link;
    private Integer source;
}
