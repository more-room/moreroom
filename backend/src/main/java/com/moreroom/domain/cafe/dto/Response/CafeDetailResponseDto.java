package com.moreroom.domain.cafe.dto.Response;

import com.moreroom.domain.theme.dto.response.ThemeListResponseDto.ThemeListComponentDto;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CafeDetailResponseDto {

    private Integer cafeId;
    private Integer brandId;
    private String regionId;
    private String address;
    private String cafeName;
    private String tel;
    private String link;
    private Float latitude;
    private Float longitude;
    private Boolean openFlag;
    private List<ThemeListComponentDto> themeList;
}
