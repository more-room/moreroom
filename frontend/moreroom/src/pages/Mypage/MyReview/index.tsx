/** @jsxImportSource @emotion/react */
import React, { useState, useMemo } from 'react';
import { TopBar } from '../../../components/TopBar';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../components/Icon';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Typography } from '../../../components/Typography';
import { containerCss, sortCss } from './styles';
import { useQuery } from '@tanstack/react-query';
import { getMyReview } from '../../../apis/mypageApi';
import { ReivewList } from './ReviewList';
import { useModal } from '../../../hooks/useModal';
import { ReviewSort } from '../../../modals/mypage/ReviewSort';
import { IMyReview } from '../../../types/mypageTypes';

export const MyReview = () => {
  const nav = useNavigate();
  const modal = useModal();

  // 정렬 기준 상태
  const [sortOption, setSortOption] = useState('최신 작성순'); // 기본값: '작성순'
  
  // 리뷰 데이터 가져오기
  const ReviewQuery = useQuery({
    queryKey: ['myReview'],
    queryFn: async () => await getMyReview(),
  });

  console.log(ReviewQuery)

  // 정렬된 리뷰 목록을 계산
  const sortedReviews = useMemo(() => {
    if (!ReviewQuery.data?.data.content) return [];

    const reviews = [...ReviewQuery.data.data.content];

    switch (sortOption) {
      case '최신 작성순':
        return reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case '오래된 작성순':
        return reviews.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case '높은 별점순':
        return reviews.sort((a, b) => b.score - a.score);
      default:
        return reviews;
    }
  }, [ReviewQuery.data, sortOption]);

  // 모달에서 정렬 옵션 선택 핸들러
  const handleSortSelect = (option: string) => {
    setSortOption(option);
    modal.hide();
  };

  return (
    <div>
      <TopBar>
        <TopBar.Title
          type="default"
          title="내가 쓴 리뷰 조회"
          backHandler={() => nav(-1)}
        />
        <TopBar.Right handler={() => console.log('it"s notification')} />
      </TopBar>
      <div css={containerCss}>
        <div css={sortCss}>
          <Icon color="grey" size={1}>
            <ChevronDownIcon />
          </Icon>
          <Typography
            color="grey"
            size={1}
            weight={700}
            onClick={() => modal.show(<ReviewSort sortOption={sortOption} onSelect={handleSortSelect} />, 35)}
          >
            {sortOption} {/* 현재 선택된 정렬 기준 */}
          </Typography>
        </div>
        {sortedReviews.map((review: IMyReview) => (
          <ReivewList
            key={review.reviewId}
            nickname={review.member.memberName}
            profileSrc={review.member.memberProfile}
            content={review.content}
            score={review.score}
            poster={review.theme.poster}
            themeId={review.theme.themeId}
            themeTitle={review.theme.title}
            cafeBrand={review.cafe.brandName}
            cafeBranch={review.cafe.branchName}
            updatedAt={review.createdAt}
          />
        ))}
      </div>
    </div>
  );
};
