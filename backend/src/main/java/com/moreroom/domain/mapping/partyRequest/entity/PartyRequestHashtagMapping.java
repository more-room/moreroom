package com.moreroom.domain.mapping.partyRequest.entity;

import com.moreroom.domain.genre.entity.Genre;
import com.moreroom.domain.hashtag.entity.Hashtag;
import com.moreroom.domain.mapping.party.entity.PartyHashtagMapping;
import com.moreroom.domain.partyRequest.entity.PartyRequest;
import com.moreroom.domain.theme.entity.Theme;
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
@IdClass(PartyRequestHashtagMapping.class)
public class PartyRequestHashtagMapping {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "partyRequestId")
    private PartyRequest partyRequest;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hashtagId")
    private Hashtag hashtag;

    protected PartyRequestHashtagMapping() {
    }
}
