package com.moreroom.domain.brand.service;

import com.moreroom.domain.brand.dto.response.BrandInfoResponseDto;
import com.moreroom.domain.brand.repository.BrandQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class BrandInfoService {

    private final BrandQueryRepository brandQueryRepository;

    public BrandInfoResponseDto getBrandList(String keyword) {
        return BrandInfoResponseDto.toDto(
            brandQueryRepository.findAllByBrandNameOrderByCafeCountDesc(keyword));
    }
}
