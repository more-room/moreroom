package com.moreroom.domain.cafe.dto.Response;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CafeListResponseDto {

    List<CafeListComponentDto> cafeList;
}
