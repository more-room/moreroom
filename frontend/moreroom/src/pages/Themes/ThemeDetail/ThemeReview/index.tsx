/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react';
import { IReviewListItem } from '../../../../types/reviewTypes';
import { Typography } from '../../../../components/Typography';
import { container, img, info, profile, rating, title } from './styles';
import { ICafeThemeDetail } from '../../../../types/cafeTypes';
import { Icon } from '../../../../components/Icon';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import SolidHandThumbUpIcon from '@heroicons/react/24/solid/HandThumbUpIcon';
import OutlineHandThumbUpIcon from '@heroicons/react/24/outline/HandThumbUpIcon';
import { MenuTab } from '../../../../components/MenuTab';
import Rating from '../../../../components/Rating';
import { getDateDiff } from '../../../../utils/dateUtils';
import { useMutation } from '@tanstack/react-query';
import { patchThumbsUp } from '../../../../apis/reviewApi';

interface ThemeReviewProps {
  review: IReviewListItem;
  cafe: ICafeThemeDetail;
  onClickReview: () => void;
}

export const ThemeReview = ({
  review,
  cafe,
  onClickReview,
}: ThemeReviewProps) => {
  const [reviewType, setReviewType] = useState<number>(0);
  const [upFlag, setUpFlag] = useState<boolean>(review.upFlag);
  const countRef = useRef<number>(review.thumbsUp);

  const reviewHandler = (menu: number) => setReviewType(menu);

  const { mutate } = useMutation({
    mutationFn: async () => await patchThumbsUp(review.reviewId),
    onSuccess: () => {
      upFlag ? (countRef.current -= 1) : (countRef.current += 1);
      setUpFlag((prev) => !prev);
    },
  });

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
          <Icon size={1} color="light" onClick={onClickReview}>
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
            <img
              src={`/profiles/profile${review.member.memberProfile}.png`}
              css={img}
            />
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
          <div css={rating} onClick={() => mutate()}>
            <Icon color={upFlag ? 'secondary' : 'light'} size={1}>
              {upFlag ? <SolidHandThumbUpIcon /> : <OutlineHandThumbUpIcon />}
            </Icon>
            <Typography color="light" size={0.75} weight={400}>
              {countRef.current}
            </Typography>
          </div>
        </div>
        <Typography color="light" size={0.875} weight={400}>
          {review.content}
        </Typography>
        <Typography color="grey" size={0.875} weight={400}>
          {getDateDiff(review.createdAt)}
        </Typography>
      </div>
    </div>
  );
};
