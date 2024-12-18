import { css } from '@emotion/react';
import { Colors } from '../../../styles/globalStyle';

export const containerCss = css`
  position: absolute;
  left: 0;
  right: 0;
  padding: 1.25rem;
`;

export const optionStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9375rem 0;
  border-bottom: 0.0625rem solid #3a3a3a;
`;

export const labelStyles = css`
  color: #ffffff;
  font-size: 1rem;
`;

export const checkmarkStyles = (ischecked:boolean) => css`
  color: ${ischecked ? Colors['primary']['A200'] : Colors['grey']['A200']};
  font-size: 1.25rem;
`;

export const confirmButtonStyles = css`
  width: 100%;
  font-size: 1rem;
  margin-top: 1.25rem;
`;