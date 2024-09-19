package com.moreroom.domain.cafe.entity;

import com.moreroom.domain.brand.entity.Brand;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(callSuper = true)
public class Cafe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cafeId;
    private Integer brandId;
    @Column(nullable = false, length = 50)
    private String regionId;
    @Column(nullable = false, length = 50)
    private String cafeName;
    @Column(length = 100)
    private String address;
    @Column(length = 15)
    private String tel;
    @Column(length = 2048)
    private String link;
    @Column(length = 50)
    private String branchName;
    private float latitude;
    private float longitude;
    @Column(nullable = false)
    @Builder.Default
    private boolean openFlag = true;
}
