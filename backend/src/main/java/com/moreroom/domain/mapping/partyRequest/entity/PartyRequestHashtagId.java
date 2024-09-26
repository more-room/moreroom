package com.moreroom.domain.mapping.partyRequest.entity;

import com.moreroom.domain.hashtag.entity.Hashtag;
import com.moreroom.domain.mapping.party.entity.PartyHashtagId;
import com.moreroom.domain.partyRequest.entity.PartyRequest;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class PartyRequestHashtagId implements Serializable {
    private PartyRequest partyRequest;
    private Hashtag hashtag;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        PartyRequestHashtagId that = (PartyRequestHashtagId) o;
        return Objects.equals(partyRequest, that.partyRequest) && Objects.equals(
            hashtag, that.hashtag);
    }

    @Override
    public int hashCode() {
        return Objects.hash(partyRequest, hashtag);
    }
}
