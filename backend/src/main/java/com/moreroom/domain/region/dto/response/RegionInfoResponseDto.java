package com.moreroom.domain.region.dto.response;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RegionInfoResponseDto {

    List<RegionInfoParentDto> regions;

    public static RegionInfoResponseDto toDto(Map<String, RegionInfoParentDto> map) {
        return RegionInfoResponseDto.builder()
            .regions(new ArrayList<>(map.values()))
            .build();
    }
}
