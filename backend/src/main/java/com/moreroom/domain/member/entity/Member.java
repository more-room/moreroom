package com.moreroom.domain.member.entity;

import com.moreroom.global.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@Table(name = "member")
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;
    @Column(nullable = false, unique = true, length = 50)
    private String email;
    @Column(nullable = false, length = 64)
    private String password;
    @Column(nullable = false, unique = true, length = 15)
    private String nickname;
    @Column(nullable = false)
    private Boolean gender;
//    @Column(nullable = false, length = 50)
//    private String regionId;
    @Column(nullable = false)
    private Date birth;
    @Column(nullable = false)
    @Builder.Default
    private Integer clearRoom = 0;
    @Column(nullable = false)
    @Builder.Default
    private Boolean delFlag = false;
    @Column
    private String photo;
}
