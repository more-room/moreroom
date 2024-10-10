package com.moreroom.domain.partyRequest.exception;

import com.moreroom.global.exception.ExceptionConstants;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PartyRequestExceptionConstants implements ExceptionConstants {
  PARTY_REQUEST_NOT_FOUND("PR001", "파티 요청을 찾을 수 없습니다."),
  PARTY_ACCEPT_FAILED("PR002", "파티 참가/거절 실패");

  private final String code;
  private final String message;
}
