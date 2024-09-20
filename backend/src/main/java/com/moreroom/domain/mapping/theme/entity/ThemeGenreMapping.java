package com.moreroom.domain.mapping.theme.entity;

import com.moreroom.domain.genre.entity.Genre;
import com.moreroom.domain.theme.entity.Theme;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Entity
@Getter
@Builder
@AllArgsConstructor
@ToString(callSuper = true)
@IdClass(ThemeGenreMapping.class)
public class ThemeGenreMapping {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "themeId")
    private Theme theme;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "genreId")
    private Genre genre;

    protected ThemeGenreMapping() {
    }
}
