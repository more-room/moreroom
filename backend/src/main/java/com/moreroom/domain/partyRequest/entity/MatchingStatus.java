package com.moreroom.domain.partyRequest.entity;

import lombok.Getter;

@Getter
public enum MatchingStatus {
    /*
    아직 매칭 안됨,
    매칭됨 -> 사용자 수락 필요
    수락 후 기다리는 중
    해당 요청 비활성화
     */
    NOT_MATCHED,
    MATCHED,
    PENDING,
    DISABLED
}
