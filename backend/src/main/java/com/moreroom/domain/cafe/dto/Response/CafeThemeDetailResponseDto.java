package com.moreroom.domain.cafe.dto.Response;

import com.moreroom.domain.cafe.entity.Cafe;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CafeThemeDetailResponseDto {

    private Integer cafeId;
    private Integer brandId;
    private String regionId;
    private String address;
    private String cafeName;
    private String brandName;
    private String branchName;
    private String tel;
    private String link;
    private Float latitude;
    private Float longitude;

    public static CafeThemeDetailResponseDto toDto(Cafe cafe, String brandName) {
        return CafeThemeDetailResponseDto.builder()
            .cafeId(cafe.getCafeId())
            .brandId(cafe.getBrand() == null ? null : cafe.getBrand().getBrandId())
            .regionId(cafe.getRegion().getRegionId())
            .cafeName(cafe.getCafeName())
            .address(cafe.getAddress())
            .brandName(brandName)
            .branchName(cafe.getBranchName())
            .tel(cafe.getTel())
            .link(cafe.getLink())
            .latitude(cafe.getLatitude())
            .longitude(cafe.getLongitude())
            .build();
    }
}
