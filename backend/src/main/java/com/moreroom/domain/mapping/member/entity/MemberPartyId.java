package com.moreroom.domain.mapping.member.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class MemberPartyId implements Serializable {
    @Column(name = "memberId")
    private Long memberId;
    @Column(name = "partyId")
    private Long partyId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MemberPartyId that = (MemberPartyId) o;
        return Objects.equals(memberId, that.memberId) && Objects.equals(partyId, that.partyId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(memberId, partyId);
    }
}
