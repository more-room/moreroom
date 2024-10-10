package com.moreroom.domain.partyRequest.exception;

import com.moreroom.global.exception.CustomException;

public class PartyAcceptFailedException extends CustomException {

  private static final long serialVersionUID = 1L;

  public PartyAcceptFailedException() {
    super(PartyRequestExceptionConstants.PARTY_ACCEPT_FAILED);
  }
}
