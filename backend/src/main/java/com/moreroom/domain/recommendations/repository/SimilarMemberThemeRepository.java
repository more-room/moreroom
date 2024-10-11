package com.moreroom.domain.recommendations.repository;

import com.moreroom.domain.recommendations.entity.SimilarMemberTheme;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SimilarMemberThemeRepository extends MongoRepository<SimilarMemberTheme, String> {

    SimilarMemberTheme findByMemberId(Long memberId);
}
