package com.moreroom.domain.theme.entity;

import com.moreroom.domain.cafe.entity.Cafe;
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
@ToString(callSuper = true)
@Builder
@Table(name = "theme")
public class Theme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer themeId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, name = "cafeId")
    private Cafe cafe;
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
    private Double avgScore;
    private Double userLevel;
}
