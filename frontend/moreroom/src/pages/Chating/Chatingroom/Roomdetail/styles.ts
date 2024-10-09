import { css } from '@emotion/react';
import { Colors } from '../../../../styles/globalStyle';

export const container = css`
  margin: 4rem 1.5rem;
`;

export const titletext = css`
  color: ${Colors['light']['100']};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
  font-size: 1.2rem;
  font-weight: 500;
`;
export const topbarcolor = css`
  background-color: #313131;
`;
export const textcolor = css`
  color: ${Colors['light']['100']};
  margin: 1rem;
`;

export const infobox = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'paperlogy';
  margin-bottom: 1rem;
`;
export const buttoncss = css`
  margin: 0 1rem;
  font-weight: 700;
  border: none;
  font-size: 1rem;
`;
export const hr = css`
  margin: 1rem 0;
  background-color: ${Colors['grey']['500']};
  height: 1px;
  border: none;
`;

export const exitbutton = css`
  border: none;
  background-color: ${Colors['danger']['A200']};
  font-size: 1rem;
`;
export const fixbutton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: ${Colors['secondary']['200']};
  font-size: 1rem;
  width: 80%;
  margin: 1rem 0rem;
`;

export const wait = css`
  color: #ffffff;
  background-color: ${Colors['grey']['900']};
  text-align: center;
  padding: 5rem;
  margin: 1rem;
`;
export const memberContainer = css`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin: 1rem 0;
`;

export const memberItem = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
`;

export const memberImage = css`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5rem;
`;

export const memberName = css`
  font-size: 0.9rem;
  color: ${Colors['light']['100']};
  text-align: center;
`;

export const inputStyle = css`
  width: 90%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: 'paperlogy';
`;

export const modalContent = css`
  /* display: flex; */
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  font-family: 'paperlogy';
  /* margin-top: 1rem; */
`;

export const modalTitle = css`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: ${Colors['grey']['700']};
`;

export const btnContainerCss = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  gap: 0.5rem;
`;

export const rangeInputStyle = css`
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  background: ${Colors['light']['A200']};
  border-radius: 5px;
  outline: none;
  opacity: 0.9;
  transition: opacity 0.15s ease-in-out;
  margin-top: 1.5rem;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: ${Colors['primary']['A200']};
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: ${Colors['primary']['A200']};
    border-radius: 50%;
    cursor: pointer;
  }
`;
