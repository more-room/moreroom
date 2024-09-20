package com.moreroom.domain.theme.repository;

import com.moreroom.domain.theme.entity.Theme;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThemeRepository extends JpaRepository<Theme, Integer> {

    Optional<Theme> findByThemeId(Integer themeId);
}
