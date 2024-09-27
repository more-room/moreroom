package com.moreroom.domain.party.exception;

import com.moreroom.global.exception.CustomException;

public class PartyFullException extends CustomException {

  private static final long serialVersionUID = 1L;

  public PartyFullException() {
    super(PartyExceptionConstants.PARTY_FULL);
  }
}
