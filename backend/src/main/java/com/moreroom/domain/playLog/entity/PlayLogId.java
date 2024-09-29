package com.moreroom.domain.playLog.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class PlayLogId implements Serializable {

    @Column(name = "memberId")
    private Long memberId;
    @Column(name = "themeId")
    private Integer themeId;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        PlayLogId that = (PlayLogId) o;
        return Objects.equals(memberId, that.memberId) && Objects.equals(themeId, that.themeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(memberId, themeId);
    }

}
