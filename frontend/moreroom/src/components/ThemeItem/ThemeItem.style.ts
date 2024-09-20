import { css } from '@emotion/react';
import { Colors } from '../../styles/globalStyle';

export const containerCss = css`
  background-color: #313131;
  display: flex;
  height: 6.25rem;
  align-items: flex-start;
`;

export const imgCss = css`
  width: 5rem;
  height: 6.25rem;
  border-radius: 0.25rem;
`;

export const infoCss = css`
  padding: 0.375rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

export const infoItemCss = css`
  display: flex;
  align-items: center;
  gap: 0.28125rem;
`;

export const contentCss = css`
  padding-left: 0.1rem;
`;

export const lineCss = css`
  width: 80vw;
  border: 0.0625rem solid ${Colors['grey']['900']};
  margin-top: 0.18rem !important;
  align-self: flex-end;
`;
