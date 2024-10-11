package com.moreroom.domain.mapping.partyRequest.entity;

import com.moreroom.domain.genre.entity.Genre;
import com.moreroom.domain.hashtag.entity.Hashtag;
import com.moreroom.domain.mapping.party.entity.PartyHashtagMapping;
import com.moreroom.domain.partyRequest.entity.PartyRequest;
import com.moreroom.domain.theme.entity.Theme;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@Builder
@AllArgsConstructor
@ToString(callSuper = true)
@Table(name = "requesthashtagmapping")
@IdClass(PartyRequestHashtagId.class)
public class PartyRequestHashtagMapping {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "partyRequestId")
    private PartyRequest partyRequest;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hashtagId", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Hashtag hashtag;

    @Column(name = "hashtagType")
    private String hashtagType;


    protected PartyRequestHashtagMapping() {
    }
}
