package com.moreroom.domain.recommendations.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DemographicThemeRepository extends
    MongoRepository<DemographicThemeRepository, String> {

    DemographicThemeRepository findByGroupId(String groupId);
}
