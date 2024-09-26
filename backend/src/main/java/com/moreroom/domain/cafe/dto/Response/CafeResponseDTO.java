package com.moreroom.domain.cafe.dto.Response;

import com.moreroom.domain.theme.entity.Theme;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CafeResponseDTO {

    private Integer cafeId;
    private Integer brandId;
    private String regionId;
    private String address;
    private String cafeName;
    private String tel;
    private String link;
    private Float latitude;
    private Float longitude;
    private List<Theme> themeList;

}
