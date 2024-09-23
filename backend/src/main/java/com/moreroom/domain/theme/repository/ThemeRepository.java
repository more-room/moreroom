package com.moreroom.domain.theme.repository;

import com.moreroom.domain.theme.entity.Theme;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThemeRepository extends JpaRepository<Theme, Integer> {

}
