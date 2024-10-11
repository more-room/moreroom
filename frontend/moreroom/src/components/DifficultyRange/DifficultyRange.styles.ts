import { css } from '@emotion/react';
import { Colors } from '../../styles/globalStyle';
import {
  TDifficultySize,
  TDiffilcultyDir,
  difficultySize,
} from './DifficultyRange.types';

export const base = (dir: TDiffilcultyDir, size: TDifficultySize) => css`
  display: flex;

  ${dir === 'row' &&
  css`
    column-gap: ${difficultySize[size]['gap']}rem;
  `}

  ${dir === 'col' &&
  css`
    flex-direction: column-reverse;
    row-gap: ${difficultySize[size]['gap']}rem;
  `}
`;

export const box = (
  dir: TDiffilcultyDir,
  size: TDifficultySize,
  bgColor: string | false,
) => css`
  width: ${difficultySize[size][dir === 'row' ? 'long' : 'short']}rem;
  height: ${difficultySize[size][dir === 'row' ? 'short' : 'long']}rem;
  background-color: ${bgColor ? bgColor : Colors['grey']['800']};
`;
