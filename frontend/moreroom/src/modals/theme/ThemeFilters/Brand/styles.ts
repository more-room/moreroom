import { css } from '@emotion/react';
import { MainColors } from '../../../../styles/globalStyle';

export const container = css`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  overflow-y: scroll;
`;

export const inputContainer = css`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  padding: 0 1rem;
  border: 0.0625rem solid ${MainColors['light']};
  border-radius: 0.5rem;
  box-sizing: border-box;
`;

export const input = css`
  background-color: transparent;
  outline: none;
  border: none;
  width: 100%;
  color: white;
  font-size: 1rem;
  font-family: 'Paperlogy';
`;

export const items = css`
  width: 100%;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow-y: scroll;
  gap: 1rem;
  margin-top: 2rem;
  padding-bottom: 1rem;
`;
