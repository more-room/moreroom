package com.moreroom.domain.externalReview.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.time.LocalDate;
import lombok.Builder;
import lombok.Getter;

@Entity
@Builder
@Getter
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
