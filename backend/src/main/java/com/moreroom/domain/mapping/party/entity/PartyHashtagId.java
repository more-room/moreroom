package com.moreroom.domain.mapping.party.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class PartyHashtagId implements Serializable {
    @Column(name = "partyId")
    private Long partyId;
    @Column(name = "hashtagId")
    private Long hashtagId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PartyHashtagId that = (PartyHashtagId) o;
        return Objects.equals(partyId, that.partyId) && Objects.equals(hashtagId, that.hashtagId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(partyId, hashtagId);
    }
}
