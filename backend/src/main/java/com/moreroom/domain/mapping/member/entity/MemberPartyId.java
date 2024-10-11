package com.moreroom.domain.mapping.member.entity;

import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.party.entity.Party;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class MemberPartyId implements Serializable {
    private Member member;
    private Party party;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MemberPartyId that = (MemberPartyId) o;
        return Objects.equals(member, that.member) && Objects.equals(party, that.party);
    }

    @Override
    public int hashCode() {
        return Objects.hash(member, party);
    }
}
