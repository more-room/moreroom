package com.moreroom.domain.history.dto.request;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class HistoryRequestDto {

    private Integer themeId;
    private String date;
    private String content;
    private Integer hintCount;
    private Integer price;
    private Double memberLevel;
    private Integer memberPlayTime;
    private Integer players;
    private Boolean successFlag;
}
