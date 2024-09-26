package com.moreroom.domain.hashtag.repository;

import com.moreroom.domain.hashtag.entity.Hashtag;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HashtagRepository extends JpaRepository<Hashtag, Integer> {
    Hashtag findByHashtagId(Integer hashtagId);
    List<Hashtag> findAllByHashtagIdIn(List<Integer> hashtagId);
}
