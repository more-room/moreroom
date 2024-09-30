package com.moreroom.domain.party.exception;

import com.moreroom.global.exception.ExceptionConstants;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PartyExceptionConstants implements ExceptionConstants {
  PARTY_NOT_FOUND("P001", "파티를 찾을 수 없습니다."),
  NOT_RECRUITING("P002", "신규 인원을 모집하지 않는 파티입니다."),
  PARTY_FULL("P003", "파티 정원이 초과되었습니다."),
  NOT_MASTER("P004", "파티 정보를 수정할 권한이 없습니다."),
  INPUT_VALIDATION("P005", "입력값의 양식이 잘못되었거나 제한 글자수를 초과합니다.");

  private final String code;
  private final String message;
}
