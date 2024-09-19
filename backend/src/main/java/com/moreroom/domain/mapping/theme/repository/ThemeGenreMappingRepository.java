package com.moreroom.domain.mapping.theme.repository;

import com.moreroom.domain.mapping.theme.entity.ThemeGenreId;
import com.moreroom.domain.mapping.theme.entity.ThemeGenreMapping;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThemeGenreMappingRepository extends JpaRepository<ThemeGenreMapping, ThemeGenreId> {

}
