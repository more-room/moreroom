package com.moreroom.domain.history.entity;

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
    @Column(nullable = false)
    private Long memberId;
    @Column(nullable = false)
    private Integer themeId;
    private Long reviewId;
    private Integer memberPlayTime;
    private Integer price;
    private Integer hintCount;
    @Column(length = 2000)
    private String content;
    private float memberLevel;
    @LastModifiedDate
    private LocalDateTime updatedAt;
    @Column(nullable = false)
    @Builder.Default
    private boolean delFlag = false;
    private Integer players;
    @Column(nullable = false)
    @Builder.Default
    private boolean successFlag = false;

}
