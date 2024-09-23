import { css } from '@emotion/react';
import { Colors } from '../../../styles/globalStyle';

export const containerCss = css`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const profileContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2.1875rem auto;
  /* text-align: center; */
`;

export const profile = css`
  color: white;
  width: 80px;
  margin-right: 1rem;
`;

export const ChipCss = css`
  display: flex;
  gap: 0.5rem;
`;

export const lineCss = css`
  border: 0.0625rem solid ${Colors['grey']['500']};
  width: 100%;
`;

export const sectionCss = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const manageInfoContainerCss = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
