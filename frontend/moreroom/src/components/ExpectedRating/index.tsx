/** @jsxImportSource @emotion/react */
import React from 'react';
import { boxStyle1, boxStyle2, base } from './ExpectedRating.styles'; // 스타일을 불러옴
import { ExpectedRatingProps } from './ExpectedRating.types'; // 타입을 정의하는 파일

export const ExpectedRating = ({
  children = ['예상', '4.5'],
  size = 1, // 각 박스의 크기 (정사각형 한 변의 길이, rem 단위)
  weight = 600, // 글자 굵기
  borderRadius = 0.5, // 각 박스의 테두리 둥글기 (rem)
  ...props
}: ExpectedRatingProps) => {
  return (
    <div css={base} {...props}>
      <div css={boxStyle1(size, weight, borderRadius)}>{children[0]}</div>
      <div css={boxStyle2(size, weight, borderRadius)}>{children[1]}</div>
    </div>
  );
};
