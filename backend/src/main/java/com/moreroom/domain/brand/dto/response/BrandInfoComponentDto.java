package com.moreroom.domain.brand.dto.response;

import com.moreroom.domain.brand.entity.Brand;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class BrandInfoComponentDto {

    private Integer brandId;
    private String brandName;

    public static BrandInfoComponentDto toDto(Brand brand) {
        return BrandInfoComponentDto.builder()
            .brandId(brand.getBrandId())
            .brandName(brand.getBrandName())
            .build();
    }
}
