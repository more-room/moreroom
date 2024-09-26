package com.moreroom.domain.cafe.dto.request;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CafeListRequestDto {

    private List<Integer> brandId;
    private String region;
    private String cafeName;
}
