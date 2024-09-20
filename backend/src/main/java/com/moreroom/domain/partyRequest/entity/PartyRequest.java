package com.moreroom.domain.partyRequest.entity;

import static com.moreroom.domain.partyRequest.entity.MatchingStatus.NOT_MATCHED;

import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.theme.entity.Theme;
import com.moreroom.global.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@SuperBuilder
public class PartyRequest extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long partyRequestId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, name = "memberId")
    private Member member;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, name = "themeId")
    private Theme theme;
    private LocalDateTime lastMatchedAt;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private MatchingStatus matchingStatus = NOT_MATCHED;
}
