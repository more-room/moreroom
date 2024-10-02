package com.moreroom.domain.deviceToken.entity;

import com.moreroom.domain.member.entity.Member;
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
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

/**
 * create table devicetoken(
 * 	tokenId bigint auto_increment primary key,
 *     memberId bigint not null,
 *     token varchar(255) not null,
 *     deviceType enum('ANDROID','IOS') not null,
 *     createdAt datetime default now(),
 *     updatedAt datetime default now(),
 *     foreign key (memberId) references member(memberId),
 *     unique key unique_member_device (memberId, deviceType)
 * );
 */
@Entity
@Table(name = "devicetoken")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@SuperBuilder
public class DeviceToken extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long tokenId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "memberId", nullable = false)
  private Member member;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private DeviceType deviceType;
}
