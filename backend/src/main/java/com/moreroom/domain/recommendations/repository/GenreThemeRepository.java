package com.moreroom.domain.recommendations.repository;

import com.moreroom.domain.recommendations.entity.GenresTheme;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenreThemeRepository extends
    MongoRepository<GenresTheme, String> {

    GenresTheme findByGroupId(String groupId);
}
