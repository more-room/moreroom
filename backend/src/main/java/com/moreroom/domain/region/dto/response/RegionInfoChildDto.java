package com.moreroom.domain.region.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RegionInfoChildDto {

    private String regionId;
    private String regionName;
}
