package com.moreroom.domain.mapping.theme.repository;

import com.moreroom.domain.mapping.theme.entity.ThemeGenreId;
import com.moreroom.domain.mapping.theme.entity.ThemeGenreMapping;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThemeGenreMappingRepository extends JpaRepository<ThemeGenreMapping, ThemeGenreId> {

    List<ThemeGenreMapping> findAllByThemeThemeId(Integer themeId);
}
