package com.moreroom.domain.brand.service;

import com.moreroom.domain.brand.dto.response.BrandInfoResponseDto;
import com.moreroom.domain.brand.repository.BrandRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class BrandInfoService {

    private final BrandRepository brandRepository;

    public BrandInfoResponseDto getBrandList() {
        return BrandInfoResponseDto.toDto(brandRepository.findAll());
    }
}
