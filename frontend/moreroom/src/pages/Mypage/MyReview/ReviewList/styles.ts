import { css } from '@emotion/react';
import { Colors } from '../../../../styles/globalStyle';

export const containerCss = css`
  background-color: #424242;
  width: 100%;
  max-width: 100%;
  margin: 1rem 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

export const headerCss = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export const leftContentCss = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
`;

export const profileCss = css`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }
`;

export const themeCss = css`
  padding-left: 0.5rem;
  border-left: 0.3rem solid ${Colors['grey']['700']};
`;

export const brandCss = css`
  display: flex;
  gap: 0.2rem;
  margin-top: 0.3rem;
  align-items: center;
`;

export const posterCss = css`
  width: 4rem;
  height: 5rem;
  flex-shrink: 0;
  overflow: hidden;
  margin-left: 1rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const contentCss = css`
  width: 100%;
`;

export const updatedAtCss = css`
  margin-top: 1rem;
`;