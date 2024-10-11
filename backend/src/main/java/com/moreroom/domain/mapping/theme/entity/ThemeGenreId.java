package com.moreroom.domain.mapping.theme.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ThemeGenreId implements Serializable {
    @Column(name = "themeId")
    private Long themeId;
    @Column(name = "genreId")
    private Long genreId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ThemeGenreId that = (ThemeGenreId) o;
        return Objects.equals(themeId, that.themeId) && Objects.equals(genreId, that.genreId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(themeId, genreId);
    }
}
