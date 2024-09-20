package com.moreroom.domain.theme.dto.response;


import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ThemeReviewResponseDto {

    private Integer count;
    private Double score;
}