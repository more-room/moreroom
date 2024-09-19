package com.moreroom.domain.theme.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
@ToString(callSuper = true)
@Builder
public class Theme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer themeId;
    @Column(nullable = false)
    private Integer cafeId;
    @Column(length = 2048)
    private String poster;
    @Column(length = 50)
    private String title;
    private Integer playtime;
    private Integer minPeople;
    private Integer maxPeople;
    @Column(length = 5)
    private String level;
    private Integer price;
    @Column(length = 2000)
    private String description;
    private float avgScore;
    private float userLevel;
    private float problemScore;
    private float storyScore;
    private float activityScore;
    private float fearScore;
    private float userLevelJb;
}
