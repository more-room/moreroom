package com.moreroom.domain.region.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@ToString(callSuper = true)
public class Region {
    @Id
    @Column(nullable = false, length = 50)
    private String regionId;
    @Column(nullable = false, length = 100)
    private String regionName;
    @Column(nullable = false)
    @Builder.Default
    private Integer regionLevel = 2;
    @Column(length = 50)
    private String parentRegionId;
    @Column(length = 100)
    private String parentRegionName;
}
