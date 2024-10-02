import { css } from '@emotion/react';
import { Colors } from '../../styles/globalStyle';

export const containerCss = css`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  width: 100%;
  padding: 0 1rem;
  background-color: #313131;
  box-sizing: border-box;
`;

export const imgCss = (imgErr: boolean) => css`
  min-width: 5rem;
  height: 6.5rem;
  border-radius: 0.25rem;

  ${imgErr &&
  css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 0.25rem;
    margin-bottom: 0.25rem;
    background-color: #212121;
  `}
`;

export const infoCss = css`
  display: flex;
  flex-direction: column;
  row-gap: 0.375rem;
  width: 100%;
  padding: 1rem 0rem;
  border-bottom: 1px solid ${Colors['grey']['700']};
`;

export const infoItemCss = css`
  display: flex;
  align-items: center;
  gap: 0.28125rem;
`;

export const contentCss = css`
  padding-left: 0.1rem;
`;
