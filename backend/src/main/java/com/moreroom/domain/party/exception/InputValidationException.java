package com.moreroom.domain.party.exception;

import com.moreroom.global.exception.CustomException;

public class InputValidationException extends CustomException {

  private static final long serialVersionUID = 1L;

  public InputValidationException() {
    super(PartyExceptionConstants.INPUT_VALIDATION);
  }
}
