package com.moreroom.domain.externalReview.repository;

import com.moreroom.domain.externalReview.entity.ExternalReview;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExternalReviewRepository extends JpaRepository<ExternalReview, Long> {

    Page<ExternalReview> findAllByThemeId(Integer themeId);

}
