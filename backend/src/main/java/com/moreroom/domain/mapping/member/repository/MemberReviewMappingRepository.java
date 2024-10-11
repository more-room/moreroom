package com.moreroom.domain.mapping.member.repository;

import com.moreroom.domain.mapping.member.entity.MemberReviewId;
import com.moreroom.domain.mapping.member.entity.MemberReviewMapping;
import com.moreroom.domain.member.entity.Member;
import com.moreroom.domain.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberReviewMappingRepository extends
    JpaRepository<MemberReviewMapping, MemberReviewId> {

    MemberReviewMapping findByMemberAndReview(Member member, Review review);

    boolean existsMemberReviewMappingByMemberAndReview(Member member, Review review);
}
