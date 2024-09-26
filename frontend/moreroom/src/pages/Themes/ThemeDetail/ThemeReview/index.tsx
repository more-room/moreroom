/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { IReviewListItem } from '../../../../types/reviewTypes';
import { Typography } from '../../../../components/Typography';
import { container, img, info, profile, rating, title } from './styles';
import { ICafeThemeDetail } from '../../../../types/cafeTypes';
import { Icon } from '../../../../components/Icon';
import { ArrowRightIcon, HandThumbUpIcon } from '@heroicons/react/24/outline';
import { MenuTab } from '../../../../components/MenuTab';
import Rating from '../../../../components/Rating';
import { getDateDiff } from '../../../../utils/dateUtils';

interface ThemeReviewProps {
  review: IReviewListItem;
  cafe: ICafeThemeDetail;
}

export const ThemeReview = ({ review, cafe }: ThemeReviewProps) => {
  const [reviewType, setReviewType] = useState<number>(0);

  const reviewHandler = (menu: number) => setReviewType(menu);

  useEffect(() => {
    console.log(reviewType);
  }, [reviewType]);

  return (
    <div style={{ marginTop: '2rem' }}>
      <Typography color="light" weight={700} style={{ marginLeft: '1rem' }}>
        리뷰
      </Typography>
      <div css={container}>
        <div css={title}>
          <Typography color="light" size={0.875} weight={400}>
            {cafe.brandName} {cafe.branchName} 리뷰
          </Typography>
          <Icon size={1} color="light">
            <ArrowRightIcon />
          </Icon>
        </div>
        <MenuTab
          children={['내부 리뷰', '외부 리뷰']}
          border={0.5}
          onChangeMenu={reviewHandler}
          fontSize={0.75}
          style={{ padding: '0.375rem 0' }}
        />
        <div css={info}>
          <div css={profile}>
            <img src={review.member.memberProfile} css={img} />
            <div>
              <Typography color="light" size={0.875} weight={700}>
                {review.member.memberName}
              </Typography>
              <div css={rating}>
                <Rating
                  activeColor="secondary"
                  count={5}
                  value={review.score}
                  size={1}
                />
                <Typography color="secondary" size={0.75} weight={400}>
                  {review.score.toFixed(1)}
                </Typography>
              </div>
            </div>
          </div>
          <div css={rating}>
            <Icon color="light" size={1}>
              <HandThumbUpIcon />
            </Icon>
            <Typography color="light" size={0.75} weight={400}>
              {review.thumbsUp}
            </Typography>
          </div>
        </div>
        <Typography color="light" size={0.875} weight={400}>
          {review.content}
        </Typography>
        <Typography color="grey" size={0.875} weight={400}>
          {getDateDiff(review.updatedAt)}
        </Typography>
      </div>
    </div>
  );
};