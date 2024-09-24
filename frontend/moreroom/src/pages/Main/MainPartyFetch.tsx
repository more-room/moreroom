/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { Colors } from '../../styles/globalStyle';

export const MainPartyFetch = () => {
  return (
    <div
      css={css`
        width: 100%;
        min-height: 10rem;
        box-sizing: border-box;
        padding: 0 1rem;
        margin: 2rem 0;
      `}
    >
      <div
        css={css`
          width: 100%;
          height: 100%;
          background-color: ${Colors['grey']['700']};
        `}
      />
    </div>
  );
};
