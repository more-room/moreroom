package com.moreroom.domain.cafe.dto.Response;

import com.moreroom.domain.cafe.entity.Cafe;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CafeReviewResponseDTO {

    private Integer cafeId;
    private String brandName;
    private String branchName;

    public static CafeReviewResponseDTO toDTO(Cafe cafe) {
        return CafeReviewResponseDTO.builder()
            .cafeId(cafe.getCafeId())
            .brandName(cafe.getBrand().getBrandName())
            .branchName(cafe.getBranchName())
            .build();
    }
}
