package com.moreroom.domain.region.dto.response;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RegionInfoResponseDto {

    List<RegionInfoParentDto> regions;

    public static RegionInfoResponseDto toDto(Map<String, RegionInfoParentDto> map) {
        List<RegionInfoParentDto> list = new ArrayList<>(map.values());
        list.sort(
            new Comparator<RegionInfoParentDto>() {
                @Override
                public int compare(RegionInfoParentDto o1, RegionInfoParentDto o2) {
                    return o1.getRegionId().compareTo(o2.getRegionId());
                }
            });
        return RegionInfoResponseDto.builder()
            .regions(list)
            .build();
    }
}
