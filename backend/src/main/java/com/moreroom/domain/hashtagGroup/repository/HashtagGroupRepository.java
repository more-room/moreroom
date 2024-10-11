package com.moreroom.domain.hashtagGroup.repository;

import com.moreroom.domain.hashtagGroup.entity.HashtagGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HashtagGroupRepository extends JpaRepository<HashtagGroup, Integer> {

}
