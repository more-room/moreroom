package com.moreroom.domain.cafe.entity;

import com.moreroom.domain.brand.entity.Brand;
import com.moreroom.domain.region.entity.Region;
import jakarta.persistence.*;
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
@Table(name = "cafe")
public class Cafe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cafeId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brandId")
    private Brand brand;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "regionId")
    private Region region;
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
    private Float latitude;
    private Float longitude;
    @Column(nullable = false)
    @Builder.Default
    private boolean openFlag = true;
}
