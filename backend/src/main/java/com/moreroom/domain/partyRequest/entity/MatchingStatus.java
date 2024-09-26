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
    NOT_MATCHED(0),
    MATCHED(1),
    PENDING(2),
    DISABLED(3);

    private final int id;

    MatchingStatus(int id) {
        this.id = id;
    }

    public int id() {
        return id;
    }
}
