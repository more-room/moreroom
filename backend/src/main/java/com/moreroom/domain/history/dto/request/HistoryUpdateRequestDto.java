package com.moreroom.domain.history.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class HistoryUpdateRequestDto {

    private String date;
    private String content;
    private Integer hintCount;
    private Integer price;
    private Float memberLevel;
    private Integer memberPlayTime;
    private Integer players;
    @NotNull(message = "성공 여부는 Null일 수 없습니다")
    private Boolean successFlag;
}
