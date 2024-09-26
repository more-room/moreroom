package com.moreroom.domain.cafe.dto.Response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CafeSearchNameResponseDto {

    private List<CafeSearchNameComponentDto> cafeList;

    @Builder
    @Getter
    @AllArgsConstructor
    public static class CafeSearchNameComponentDto {

        private Integer cafeId;
        private String cafeName;
    }
}
