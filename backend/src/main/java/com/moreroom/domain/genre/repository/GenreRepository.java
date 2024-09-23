package com.moreroom.domain.genre.repository;

import com.moreroom.domain.genre.entity.Genre;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Integer> {

    @Override
    public List<Genre> findAll();
}
