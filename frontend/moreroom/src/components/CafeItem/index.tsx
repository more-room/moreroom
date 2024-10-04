/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { CafeItemProps } from './CafeItem.types';
import { base, cafename, img, info, title } from './CafeItem.styles';
import { Typography } from '../Typography';
import { Icon } from '../Icon';
import { StarIcon } from '@heroicons/react/24/solid';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';

export const CafeItem = ({
  cafe,
  pattern = '',
  onList = false,
  children,
  ...props
}: CafeItemProps) => {
  const nav = useNavigate();
  const [imgErr, setImgErr] = useState<boolean>(false);

  return (
    <div css={base} {...props}>
      {cafe.themePoster !== null && !imgErr ? (
        <img
          src={cafe.themePoster}
          css={img(cafe.themePoster === null || imgErr)}
          onError={() => setImgErr(true)}
        />
      ) : (
        <div css={img(cafe.themePoster === null || imgErr)}>
          <Typography color="light" weight={500} size={0.75}>
            포스터를
          </Typography>
          <Typography color="light" weight={500} size={0.75}>
            준비중입니다
          </Typography>
        </div>
      )}

      <div css={info(onList)}>
        <div css={title}>
          <Typography color="light" size={1} weight={600}>
            {cafe.cafeName}
          </Typography>
          <Typography color="grey" size={0.875} weight={400}>
            {cafe.address}
          </Typography>
          <div css={cafename}>
            <Icon color="secondary" size={1}>
              <StarIcon />
            </Icon>
            <Typography color="grey" size={0.75} weight={400}>
              리뷰({cafe.reviewCount})
            </Typography>
          </div>
        </div>
        {!onList && (
          <Button
            fullwidth={true}
            rounded={0.5}
            handler={() => nav(`/cafes/${cafe.cafeId}`)}
          >
            상세보기
          </Button>
        )}
      </div>
      {children}
    </div>
  );
};
