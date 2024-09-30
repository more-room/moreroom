package com.moreroom.domain.brand.dto.response;

import com.moreroom.domain.brand.entity.Brand;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class BrandInfoResponseDto {

    List<BrandInfoComponentDto> brandList;

    public static BrandInfoResponseDto toDto(List<Brand> bl) {
        return BrandInfoResponseDto.builder()
            .brandList(bl.stream().map(BrandInfoComponentDto::toDto).toList())
            .build();
    }
}
