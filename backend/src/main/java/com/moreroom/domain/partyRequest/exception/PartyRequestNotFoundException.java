package com.moreroom.domain.partyRequest.exception;

import com.moreroom.global.exception.CustomException;
import com.moreroom.global.exception.ExceptionConstants;

public class PartyRequestNotFoundException extends CustomException {

  private static final long serialVersionUID = 1L;

  public PartyRequestNotFoundException() {
    super(PartyRequestExceptionConstants.PARTY_REQUEST_NOT_FOUND);
  }
}
