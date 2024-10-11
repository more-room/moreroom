/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Typography } from '../../../components/Typography';
import { Spinner } from '../../../components/Spinner';

const container = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  align-items: center;
  justify-content: center;
`;

export const QRLoading = () => {
  return (
    <div css={container}>
      <Spinner />
      <Typography color="light" weight={500}>
        리뷰 작성 화면으로 이동 중입니다...
      </Typography>
    </div>
  );
};
