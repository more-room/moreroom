package com.moreroom.domain.party.exception;

import com.moreroom.global.exception.CustomException;

public class PartyNotRecruitingException extends CustomException {

  private static final long serialVersionUID = 1L;

  public PartyNotRecruitingException() {
    super(PartyExceptionConstants.NOT_RECRUITING);
  }
}
