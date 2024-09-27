package com.moreroom.domain.party.exception;

import com.moreroom.global.exception.CustomException;

public class PartyNotFoundException extends CustomException {

  private static final long serialVersionUID = 1L;

  public PartyNotFoundException() {
    super(PartyExceptionConstants.PARTY_NOT_FOUND);
  }
}
