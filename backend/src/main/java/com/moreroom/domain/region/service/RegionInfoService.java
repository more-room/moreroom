package com.moreroom.domain.region.service;

import com.moreroom.domain.region.dto.response.RegionInfoChildDto;
import com.moreroom.domain.region.dto.response.RegionInfoParentDto;
import com.moreroom.domain.region.dto.response.RegionInfoResponseDto;
import com.moreroom.domain.region.entity.Region;
import com.moreroom.domain.region.repository.RegionRepository;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class RegionInfoService {

    private final RegionRepository regionRepository;

    public RegionInfoResponseDto getRegionList() {
        List<Region> regionList = regionRepository.findAll();
        Map<String, RegionInfoParentDto> map = new HashMap<>();

        for (Region r : regionList) {
            if (r.getParentRegionId() == null) {
                RegionInfoParentDto parent = map.getOrDefault(r.getRegionId(),
                    new RegionInfoParentDto());
                parent.setRegionId(r.getRegionId());
                parent.setRegionName(r.getRegionNickname());
                map.put(r.getRegionId(), parent);
            } else {
                RegionInfoParentDto parent = map.getOrDefault(r.getParentRegionId(),
                    new RegionInfoParentDto());
                RegionInfoChildDto child = RegionInfoChildDto.builder()
                    .regionName(r.getRegionName())
                    .regionId(r.getRegionId())
                    .build();
                parent.getCities().add(child);
                map.put(r.getParentRegionId(), parent);
            }
        }
        return RegionInfoResponseDto.toDto(map);
    }

}
