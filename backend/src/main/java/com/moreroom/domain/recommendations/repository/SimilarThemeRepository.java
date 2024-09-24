package com.moreroom.domain.recommendations.repository;

import com.moreroom.domain.recommendations.entity.SimilarTheme;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SimilarThemeRepository extends MongoRepository<SimilarTheme, String> {

    SimilarTheme findByThemeId(Integer themeId);
}
