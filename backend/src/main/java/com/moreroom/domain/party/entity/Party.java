package com.moreroom.domain.party.entity;

import com.moreroom.global.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    @Column(nullable = false)
    private Integer themeId;
    @Column(nullable = false)
    private Long masterId;
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
