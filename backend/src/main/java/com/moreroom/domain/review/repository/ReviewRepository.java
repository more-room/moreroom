package com.moreroom.domain.review.repository;

import com.moreroom.domain.review.entity.Review;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findAllByThemeThemeId(Integer themeId);
}
