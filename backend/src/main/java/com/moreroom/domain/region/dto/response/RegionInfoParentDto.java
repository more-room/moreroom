package com.moreroom.domain.region.dto.response;

import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Builder
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegionInfoParentDto {

    private String regionId;
    private String regionName;
    @Builder.Default
    private List<RegionInfoChildDto> cities = new ArrayList<>();
}
