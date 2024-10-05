package com.moreroom.domain.review.repository;

import com.moreroom.domain.review.entity.Review;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findAllByThemeThemeId(Integer themeId);

    @Query("SELECT r, " +
        "MAX(CASE WHEN mr.member.memberId = :memberId THEN 1 ELSE 0 END) AS upFlag " +
        "FROM Review r " +
        "LEFT JOIN MemberReviewMapping mr ON r.reviewId = mr.review.reviewId " +
        "WHERE r.theme.themeId = :themeId AND r.delFlag = false " +
        "GROUP BY r.reviewId")
    Page<Object[]> findAllByThemeThemeIdAndMemberMemberIdAndDelFlagFalse(
        @Param("themeId") Integer themeId, @Param("memberId") Long memberId, Pageable pageable);


    List<Review> findAllByMemberMemberId(Long memberId);

    Page<Review> findAllByMemberMemberIdAndDelFlagFalse(Long memberId, Pageable pageable);
}
