package com.moreroom.domain.hashtag.repository;

import com.moreroom.domain.hashtag.entity.Hashtag;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HashtagRepository extends JpaRepository<Hashtag, Integer> {
    Hashtag findByHashtagId(Integer hashtagId);

    List<Hashtag> findAllByHashtagGroupHashtagGroupId(Integer groupId);
    List<Hashtag> findAllByHashtagIdIn(List<Integer> hashtagId);
}
