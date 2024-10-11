package com.moreroom.domain.party.exception;

import com.moreroom.global.exception.CustomException;

public class JoinedPartyException extends CustomException {

  private static final long serialVersionUID = 1L;

  public JoinedPartyException() {
    super(PartyExceptionConstants.JOINED_PARTY);
  }
}
