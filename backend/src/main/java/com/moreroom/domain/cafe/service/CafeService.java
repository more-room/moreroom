package com.moreroom.domain.cafe.service;

import com.moreroom.domain.cafe.dto.Response.CafeListResponseDto;
import com.moreroom.domain.cafe.dto.Response.CafeSearchNameResponseDto;
import com.moreroom.domain.cafe.dto.Response.CafeThemeDetailResponseDto;
import com.moreroom.domain.cafe.dto.request.CafeListRequestDto;
import com.moreroom.domain.cafe.repository.CafeQueryRepository;
import com.moreroom.domain.cafe.repository.CafeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CafeService {

    private final CafeRepository cafeRepository;
    private final CafeQueryRepository cafeQueryRepository;


    public CafeListResponseDto findCafes(CafeListRequestDto cafeListRequestDto) {
        return cafeQueryRepository.findCafes(cafeListRequestDto);
    }

    public CafeThemeDetailResponseDto findCafeByThemeId(Integer themeId) {
        return cafeQueryRepository.findByThemeId(themeId);
    }

    public CafeSearchNameResponseDto findCafeByName(String name) {
        PageRequest pageRequest = PageRequest.of(0, 10);
        CafeSearchNameResponseDto cafeSearchNameResponseDto = cafeQueryRepository.findAllByCafeName(
            name, pageRequest);

        return cafeSearchNameResponseDto;
    }
}
