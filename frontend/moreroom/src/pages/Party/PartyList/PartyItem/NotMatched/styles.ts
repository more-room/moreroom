import { css } from "@emotion/react";

export const containerCss = css`
position: relative;
  display: flex;
  flex-direction: column;
  background-color: #424242;
  margin: 1rem;
  padding: 1rem;
  gap: 1rem;
`;

export const topContentCss = (isLoading:boolean) => css`
  display: flex; 
  gap: 1rem; 
  align-items: center; 
  opacity: ${isLoading ? '60%' : undefined};
  filter: ${isLoading ? 'blur(0.2rem)' : undefined};
`;

export const imgCss = css`
  width: 6.25rem;
  height: 7.5rem;
`;

export const contentCss = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
  flex-grow: 1;
`;

export const timeCss = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const chipCss = css`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const btnContainerCss = (isLoading:boolean) => css`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  opacity: ${isLoading ? '60%' : undefined};
  filter: ${isLoading ? 'blur(0.2rem)' : undefined};
`;