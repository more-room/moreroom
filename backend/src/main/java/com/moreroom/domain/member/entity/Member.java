package com.moreroom.domain.member.entity;

import com.moreroom.domain.member.dto.request.MemberUpdateRequestDTO;
import com.moreroom.domain.region.entity.Region;
import com.moreroom.global.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
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
    @Column(name = "memberId")
    private Long memberId;
    @Column(nullable = false, unique = true, length = 50)
    private String email;
    @Column(nullable = false, length = 64)
    private String password;
    @Column(nullable = false, unique = true, length = 15)
    private String nickname;
    @Column(nullable = false)
    private Boolean gender;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "regionId")
    private Region region;
    @Column(nullable = false)
    private Date birth;
    @Column(nullable = false, name= "clearRoom")
    @Builder.Default
    private Integer clearRoom = 0;
    @Column(nullable = false)
    @Builder.Default
    private Boolean delFlag = false;
    @Column
    private String photo;

    public void updateMember(MemberUpdateRequestDTO memberUpdateRequestDTO, Region region) {
        this.nickname = memberUpdateRequestDTO.getNickname();
        this.gender = memberUpdateRequestDTO.getGender();
        this.region = region;
        this.birth = memberUpdateRequestDTO.getBirth();
        this.clearRoom = memberUpdateRequestDTO.getClearRoom();
    }

    public void changePassword(String newPassword) {
        this.password = newPassword;
    }
}
