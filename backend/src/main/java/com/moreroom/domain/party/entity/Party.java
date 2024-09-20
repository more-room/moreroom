package com.moreroom.domain.party.entity;

import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.theme.entity.Theme;
import com.moreroom.global.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
public class Party extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long partyId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "themeId", nullable = false)
    private Theme theme;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberId", nullable = false)
    private Member masterMember;
    @Column(nullable = false, length = 50)
    private String roomName;
    private LocalDateTime date;
    @Column(nullable = false)
    private Integer maxMember;
    @Builder.Default
    private boolean addFlag = false;
    @Column(length = 300)
    private String notice;
}
