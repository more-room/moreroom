package com.moreroom.domain.mapping.member.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class MemberGenreId implements Serializable {
    @Column(name = "memberId")
    private Long memberId;
    @Column(name = "genreId")
    private Long genreId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MemberGenreId that = (MemberGenreId) o;
        return Objects.equals(memberId, that.memberId) && Objects.equals(genreId, that.genreId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(memberId, genreId);
    }
}
