/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { TopBar } from '../../../components/TopBar';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../components/Icon';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Typography } from '../../../components/Typography';
import { containerCss, sortCss } from './styles';
import { useQuery } from '@tanstack/react-query';
import { getMyReview } from '../../../apis/mypageApi';
import { ReivewList } from './ReviewList';
import { ReviewSortFetch } from '../../../modals/mypage/ReviewSort/ReviewSortFetch';
import { useModal } from '../../../hooks/useModal';
import { ReviewSort } from '../../../modals/mypage/ReviewSort';

export const MyReview = () => {
  const nav = useNavigate();
  const modal = useModal();
  const ReviewQuery = useQuery({
    queryKey: ['myReview'],
    queryFn: async () => await getMyReview(),
  });

  console.log(ReviewQuery.data);
  const [showSortModal, setShowSortModal] = useState(false);
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
          <Typography color="grey" size={1} weight={700} onClick={()=>modal.show(<ReviewSort/>)}>
            작성순
          </Typography>
          {showSortModal && <ReviewSortFetch />}
        </div>
        {ReviewQuery.data?.data.content.map((review: any) => (
          <ReivewList
            key={review.reviewId}
            nickname={review.member.memberName}
            profileSrc={review.member.memberProfile}
            content={review.content}
            score={review.score}
            poster={review.theme.poster}
            themeTitle={review.theme.title}
            cafeBrand={review.cafe.brandName}
            cafeBranch={review.cafe.branchName}
            updatedAt={review.updatedAt}
          />
        ))}
      </div>
    </div>
  );
};
