package com.moreroom.domain.externalReview.repository;

import com.moreroom.domain.externalReview.entity.ExternalReview;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExternalReviewRepository extends JpaRepository<ExternalReview, Long> {

    Page<ExternalReview> findAllByThemeId(Integer themeId, Pageable pageable);

}
