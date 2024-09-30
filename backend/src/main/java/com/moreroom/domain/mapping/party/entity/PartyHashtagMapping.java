package com.moreroom.domain.mapping.party.entity;

import com.moreroom.domain.hashtag.entity.Hashtag;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.party.entity.Party;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Entity
@Getter
@Builder
@AllArgsConstructor
@ToString(callSuper = true)
@IdClass(PartyHashtagId.class)
public class PartyHashtagMapping {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hashtagId")
    private Hashtag hashtag;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "partyId")
    private Party party;

    protected PartyHashtagMapping() {
    }
}
