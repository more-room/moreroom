import { css } from '@emotion/react';
import { MainColors } from '../../styles/globalStyle';

export const containerCss = css`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 4rem;
  border-top: 0.0625rem solid ${MainColors.grey};
  background-color: #313131;
`;
