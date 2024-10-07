import { css } from '@emotion/react';
import { Colors } from '../../../styles/globalStyle';

export const container = css`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const noticeContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${Colors['dark']['900']};
  cursor: pointer;
`;

export const title = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const noticedetail = css`
  box-sizing: border-box;
  padding: 1rem;
  background-color: ${Colors['dark']['900']};
`;

export const chatbox = css`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem 1rem 4rem 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  overflow-y: scroll;
`;

export const inputBar = css`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  background-color: #313131;
  border-top: 1px solid white;
`;

export const input = css`
  flex: 1;
  min-height: 2.5rem;
  padding: 0 0.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: white;
  outline: none;
  font-size: 0.875rem;
`;

export const modalContent = css`
  /* display: flex; */
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  /* margin-top: 1rem; */
`;

export const modalTitle = css`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-top: 0.2rem;
  color: ${Colors['grey']['700']}
`;

export const inputStyle = css`

  width: 90%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;