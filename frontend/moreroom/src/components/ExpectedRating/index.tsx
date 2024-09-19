/** @jsxImportSource @emotion/react */
import React, { Children } from 'react';
import { base } from './ExpectedRating.styles';
import { ExpectedRatingProps } from './ExpectedRating.types';
import { Colors } from '../../styles/globalStyle';

export const ExpectedRating = ({
  backgroundColor = 'primary',  // 기본 값은 Palette에 맞춰서 설정
  color = 'dark',          // 기본 값은 Palette에 맞춰서 설정
  border = 0.1,
  weight = 400,
  size = 1.5,
  scale,
  borderRadius = 0.5,
  children = '',
  ...props
}: ExpectedRatingProps) => {
  return (
    <div style={{ display: 'flex', width: 'fit-content', gap: '0.2rem', alignItems: 'center' }} {...props}>
      <div
        css={base(backgroundColor, color, border, weight, size, scale, borderRadius)}  // Colors에서 가져오기
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem 1rem' }}
      >
        {children}
      </div>
      <div
        css={base(backgroundColor, color, border, weight, size, scale, borderRadius)}  // 색상 반전
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem 1rem' }}
      >
        {children}
      </div>
    </div>
  );
};
