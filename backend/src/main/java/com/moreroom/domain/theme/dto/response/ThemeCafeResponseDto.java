package com.moreroom.domain.theme.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ThemeCafeResponseDto {

    private Integer cafeId;
    private String brandName;
    private String branchName;
    private String cafeName;
    private String address;
}
