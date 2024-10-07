package com.moreroom.domain.theme.repository;

import com.moreroom.domain.theme.entity.Theme;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ThemeRepository extends JpaRepository<Theme, Integer> {
    Optional<Theme> findById(Integer id);

    @Query("select th from Theme th join fetch th.cafe where th.themeId = :themeId")
    Optional<Theme> findThemeAndCafeById(@Param("themeId") Integer themeId);
}
