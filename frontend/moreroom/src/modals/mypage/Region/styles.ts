import { css } from '@emotion/react';

export const container = css`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  margin-top: 2rem;
  overflow-y: scroll;
`;

export const regionContainer = css`
  display: flex;
  align-items: center;
  column-gap: 1rem;
  white-space: nowrap;
  overflow-x: scroll;
  min-height: fit-content;
`;

export const item = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const items = css`
  /* max-height: 300px; // 시군구 목록의 최대 높이 설정 */
  overflow-y: scroll;
  gap: 1rem;
  padding: 1rem 0;
  justify-content: center;
`;

export const cityListContainer = css`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;