package com.moreroom.domain.externalReview.service;

import com.moreroom.domain.externalReview.dto.response.ExternalReviewResponseDto;
import com.moreroom.domain.externalReview.entity.ExternalReview;
import com.moreroom.domain.externalReview.repository.ExternalReviewRepository;
import com.moreroom.global.dto.PageResponseDto;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class ExternalReviewService {

    private final ExternalReviewRepository externalReviewRepository;

    @Transactional(readOnly = true)
    public PageResponseDto getExternalReviewByThemeId(Integer themeId, Integer pageNumber,
        Integer pageSize) {
        PageRequest pageRequest = PageRequest.of(0, 10);
        if (pageNumber != null && pageSize != null) {
            pageRequest = PageRequest.of(pageNumber, pageSize);
        }
        Page<ExternalReview> externalReviewPage = externalReviewRepository.findAllByThemeId(themeId,
            pageRequest);
        List<ExternalReviewResponseDto> externalReviewResponseDtoList = externalReviewPage.getContent()
            .stream().map(ExternalReviewResponseDto::toDto).toList();
        PageResponseDto pageResponseDto = PageResponseDto.builder()
            .pageNumber(externalReviewPage.getNumber())
            .pageSize(externalReviewPage.getSize())
            .totalPage((long) externalReviewPage.getTotalPages())
            .totalElements(externalReviewPage.getTotalElements())
            .content(externalReviewResponseDtoList)
            .build();

        return pageResponseDto;
    }
}
