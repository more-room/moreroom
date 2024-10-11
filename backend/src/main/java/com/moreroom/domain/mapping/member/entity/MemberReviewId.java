package com.moreroom.domain.mapping.member.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.util.Objects;

@Embeddable
public class MemberReviewId {

    @Column(name = "memberId")
    private Long memberId;
    @Column(name = "reviewId")
    private Long reviewId;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        MemberReviewId that = (MemberReviewId) o;
        return Objects.equals(memberId, that.memberId) && Objects.equals(reviewId, that.reviewId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(memberId, reviewId);
    }
}
