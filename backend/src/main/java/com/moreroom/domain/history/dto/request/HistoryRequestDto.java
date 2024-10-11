package com.moreroom.domain.history.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class HistoryRequestDto {

    private Integer themeId;
    private String date;
    private String content;
    private Integer hintCount;
    private Integer price;
    private Float memberLevel;
    private Integer memberPlayTime;
    private Integer players;
    private Boolean successFlag;
}
