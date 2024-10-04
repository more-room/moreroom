package com.moreroom.domain.externalReview.dto.response;

import com.moreroom.domain.externalReview.entity.ExternalReview;
import com.moreroom.domain.externalReview.service.ExternalReviewExtractService;
import com.moreroom.global.util.StringUtil;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ExternalReviewResponseDto {

    private Long externalReviewId;
    private String content;
    private String title;
    private String link;
    private String createdAt;
    private Integer source;

    public static ExternalReviewResponseDto toDto(ExternalReview er, String title) {
        return ExternalReviewResponseDto.builder()
            .externalReviewId(er.getExternalReviewId())
            .title(er.getTitle())
            .content(ExternalReviewExtractService.getFirstKeyword(er.getContent(), title, null))
            .link(er.getLink())
            .createdAt(StringUtil.dateToString(er.getCreatedAt()))
            .source(er.getSource())
            .build();
    }
}
