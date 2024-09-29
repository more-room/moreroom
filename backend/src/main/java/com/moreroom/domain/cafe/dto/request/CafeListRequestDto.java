package com.moreroom.domain.cafe.dto.request;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class CafeListRequestDto {

    private List<Integer> brandId;
    private String region;
    private String cafeName;
}
