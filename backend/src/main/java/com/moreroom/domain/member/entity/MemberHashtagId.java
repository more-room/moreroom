package com.moreroom.domain.member.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class MemberHashtagId implements Serializable {
    @Column(name = "memberId")
    private Long memberId;
    @Column(name = "hashtagId")
    private Long hashtagId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MemberHashtagId that = (MemberHashtagId) o;
        return Objects.equals(memberId, that.memberId) && Objects.equals(hashtagId, that.hashtagId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(memberId, hashtagId);
    }
}
