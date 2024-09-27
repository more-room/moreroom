package com.moreroom.domain.mapping.party.entity;

import com.moreroom.domain.hashtag.entity.Hashtag;
import com.moreroom.domain.party.entity.Party;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class PartyHashtagId implements Serializable {
    private Party party;
    private Hashtag hashtag;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PartyHashtagId that = (PartyHashtagId) o;
        return Objects.equals(party, that.party) && Objects.equals(hashtag, that.hashtag);
    }

    @Override
    public int hashCode() {
        return Objects.hash(party, hashtag);
    }
}
