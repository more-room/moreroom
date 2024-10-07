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
import NoResult from '../../../components/common/NoResult';

export const MyReview = () => {
  const nav = useNavigate();
  const modal = useModal();


  const [sortOption, setSortOption] = useState('최신 작성순');
  const ReviewQuery = useQuery({
    queryKey: ['myReview'],
    queryFn: async () => await getMyReview(),
  });

  console.log(ReviewQuery);

  // 정렬된 리뷰 목록을 계산
  const sortedReviews = useMemo(() => {
    if (!ReviewQuery.data?.data.content) return [];

    const reviews = [...ReviewQuery.data.data.content];

    switch (sortOption) {
      case '최신 작성순':
        return reviews.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      case '오래된 작성순':
        return reviews.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
      case '높은 별점순':
        return reviews.sort((a, b) => b.score - a.score);
      default:
        return reviews;
    }
  }, [ReviewQuery.data, sortOption]);

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
            onClick={() =>
              modal.show(
                <ReviewSort
                  sortOption={sortOption}
                  onSelect={handleSortSelect}
                />,
                35,
              )
            }
          >
            {sortOption}
          </Typography>
        </div>
        {sortedReviews.length > 0 ? (
          sortedReviews.map((review: IMyReview) => (
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
          ))
        ) : (
          <div style={{height: '80vh'}}>
            <NoResult
              msg="현재 존재하는 기록이 없습니다."
              url="/history"
              btnmsg="기록 등록하러 가기"
            />
          </div>
        )}
      </div>
    </div>
  );
};
