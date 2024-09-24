package com.moreroom.domain.recommendations.repository;

import com.moreroom.domain.recommendations.entity.DemographicsTheme;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DemographicsThemeRepository extends
    MongoRepository<DemographicsTheme, String> {

    DemographicsTheme findByGroupId(String groupId);
}
