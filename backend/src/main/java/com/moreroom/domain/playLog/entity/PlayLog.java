package com.moreroom.domain.playLog.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "playLog")
@ToString(callSuper = true)
@IdClass(PlayLogId.class)
public class PlayLog {
    @Id
    private Long memberId;
    @Id
    private Integer themeId;

    private Integer playCount;


    public void increasePlayCount() {
        playCount++;
    }

    public void decreasePlayCount() {
        playCount--;
    }
}
