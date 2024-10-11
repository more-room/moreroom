package com.moreroom.domain.partyRequest.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class MockDto {
  private Long partyRequestId;
  private Long memberId;
  private Integer themeId;
  private LocalDateTime createdAt;
  private String matchingStatus;
  private String uuid;

}
