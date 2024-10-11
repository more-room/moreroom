package com.moreroom.domain.party.exception;

import com.moreroom.global.exception.CustomException;

public class NotPartyMasterException extends CustomException {

  private static final long serialVersionUID = 1L;

  public NotPartyMasterException() {
    super(PartyExceptionConstants.NOT_MASTER);
  }
}
