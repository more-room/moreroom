package com.moreroom.domain.history.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL) // null 제외
public class HistoryListResponseDto {

    private List<HistoryListComponentDto> historyList;

    @Builder
    @Getter
    @JsonInclude(JsonInclude.Include.NON_NULL) // null 제외
    public static class HistoryListComponentDto {

        private Long historyId;
        private String date;
        private Integer memberPlayTime;
        private Integer hintCount;
        private String updatedAt;
        private String content;
        private Float memberLevel;
        private Integer players;
        private Boolean successFlag;
        private HistoryListThemeDto theme;
        private Integer themeId;
        private Integer price;
        private String cafeName;


        @Builder
        @Getter
        @JsonInclude(JsonInclude.Include.NON_NULL) // null 제외
        public static class HistoryListThemeDto {

            private Integer themeId;
            private String poster;
            private String title;
            private String cafeName;
        }
    }
}
