package com.moreroom.domain.cafe.dto.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class CafeListComponentDto {

    private Integer cafeId;
    private Integer brandId;
    private String regionId;
    private String address;
    private String cafeName;
    private Float latitude;
    private Float longitude;
    private Integer themeCount;

}
