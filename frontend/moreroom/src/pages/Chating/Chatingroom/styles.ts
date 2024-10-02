import { css } from '@emotion/react';
import { Colors } from '../../../styles/globalStyle';

export const topbarcolor = css`
  background-color: #313131;

`

export const notice = css`
  background-Color: ${Colors['dark']['900']};
  color: ${Colors['light']['100']};
  padding: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer; 
  font-weight: 600;
`
export const noticedetail = css`
  background-color: #313131;
  color: ${Colors['light']['100']};
  margin: 0 1rem;

`
export const noticeIconText = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const texttype = css`
  font-family: "paperlogy";
`
/* 입력 폼 스타일 */
export const inputBar = css`
  position: fixed;
  bottom: 0; /* 페이지 하단에 고정 */
  left: 0;
  right: 0;
  background-color: #313131; /* 검은색 배경 */
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  
`;

export const input = css`
  flex-grow: 1;
  background-color: ${Colors['light']['100']};
  border: none;
  border-radius: 0.5rem;
  outline: none;
  color: ${Colors['dark']['900']};
  padding: 0.5rem;
  font-size: 1rem;
  font-family: "paperlogy";
  border-top: 1px solid #ffffff;
  margin: 0.2rem 0;
`;

export const sendBtn = css`
  cursor: pointer;
  width: 24px;
  height: 24px;
  color: ${Colors['light']['100']};
  margin-left: 0.5rem;
`;

export const iconColor = css`
  color: ${Colors['secondary']['200']};

`