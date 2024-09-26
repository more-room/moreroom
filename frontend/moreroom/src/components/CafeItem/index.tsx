/** @jsxImportSource @emotion/react */
import React from 'react';
import { CafeItemProps } from './CafeItem.types';
import { base, cafename, img, info, title } from './CafeItem.styles';
import { Typography } from '../Typography';
import { Icon } from '../Icon';
import { StarIcon } from '@heroicons/react/24/solid';
import { Button } from '../Button';

export const CafeItem = ({
  cafe,
  pattern = '',
  onList = false,
  children,
  ...props
}: CafeItemProps) => {
  return (
    <div css={base} {...props}>
      <img src={cafe.themePoster} css={img} />
      <div css={info(onList)}>
        <div css={title(onList)}>
          <div css={cafename(onList)}>
            <Typography color="light" size={1} weight={600}>
              {cafe.cafeName}
            </Typography>
            {!onList && (
              <div css={cafename(onList)}>
                <Icon color="secondary" size={1}>
                  <StarIcon />
                </Icon>
                <Typography color="grey" size={0.75} weight={400}>
                  리뷰({cafe.reviewCount})
                </Typography>
              </div>
            )}
          </div>
          <Typography color="grey" size={0.875} weight={400}>
            {cafe.address}
          </Typography>
          {onList && (
            <div css={cafename(false)}>
              <Icon color="secondary" size={1}>
                <StarIcon />
              </Icon>
              <Typography color="grey" size={0.75} weight={400}>
                리뷰({cafe.reviewCount})
              </Typography>
            </div>
          )}
        </div>
        {!onList && (
          <Button
            fullwidth={true}
            rounded={0.5}
            handler={() => console.log('going to detail')}
          >
            상세보기
          </Button>
        )}
      </div>
      {children}
    </div>
  );
};
