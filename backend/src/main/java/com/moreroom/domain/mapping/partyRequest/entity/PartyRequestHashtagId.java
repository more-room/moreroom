package com.moreroom.domain.mapping.partyRequest.entity;

import com.moreroom.domain.mapping.party.entity.PartyHashtagId;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.util.Objects;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class PartyRequestHashtagId {
    @Column(name = "partyRequestId")
    private Long partyRequestId;
    @Column(name = "hashtagId")
    private Integer hashtagId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PartyRequestHashtagId that = (PartyRequestHashtagId) o;
        return Objects.equals(partyRequestId, that.partyRequestId) && Objects.equals(hashtagId, that.hashtagId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(partyRequestId, hashtagId);
    }
}
