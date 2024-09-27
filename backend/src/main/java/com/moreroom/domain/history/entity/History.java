package com.moreroom.domain.history.entity;

import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.review.entity.Review;
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
import jakarta.persistence.OneToOne;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.LastModifiedDate;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@SuperBuilder
public class History extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long historyId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, name = "memberId")
    private Member member;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, name = "themeId")
    private Theme theme;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reviewId")
    private Review review;
    private Integer memberPlayTime;
    private Integer price;
    private Integer hintCount;
    @Column(length = 2000)
    private String content;
    private Float memberLevel;
    @LastModifiedDate
    private LocalDateTime updatedAt;
    @Column(nullable = false)
    @Builder.Default
    private boolean delFlag = false;
    private Integer players;
    @Column(nullable = false)
    @Builder.Default
    private boolean successFlag = false;
    private LocalDateTime playDate;


    public void changeHistory(Integer memberPlayTime, Integer price, Integer hintCount,
        String content, Float memberLevel, Integer players, Boolean successFlag,
        LocalDateTime playDate, LocalDateTime updatedAt) {
        this.memberPlayTime = memberPlayTime;
        this.price = price;
        this.hintCount = hintCount;
        this.content = content;
        this.memberLevel = memberLevel;
        this.players = players;
        this.successFlag = successFlag;
        this.playDate = playDate;
        this.updatedAt = updatedAt;
    }
}
