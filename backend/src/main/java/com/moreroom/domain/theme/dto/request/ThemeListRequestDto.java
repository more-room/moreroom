package com.moreroom.domain.theme.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ThemeListRequestDto {

    Integer[] genreList;
    Integer people;
    String region;
    Integer level;
    Integer brandId;
    Integer playtime;
    Integer price;
    String title;

    Integer pageNumber;
    Integer pageSize;


    // 기본값 설정
    public void setDefaults() {
        if (pageNumber == null || pageNumber < 0) {
            pageNumber = 0;
        }
        if (pageSize == null || pageSize <= 0) {
            pageSize = 10;
        }
    }
}
