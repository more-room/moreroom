package com.moreroom.global.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PageResponseDto {

    Object content;
    Integer pageNumber;
    Integer pageSize;
    Long totalPage;
    Long totalElements;

    public static PageResponseDto toDto(Object content, Integer pageNumber, Integer pageSize,
        Long totalPage, Long totalElements) {
        return PageResponseDto.builder()
            .content(content)
            .pageNumber(pageNumber)
            .pageSize(pageSize)
            .totalPage(totalPage)
            .totalElements(totalElements)
            .build();
    }
}
