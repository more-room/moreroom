/** @jsxImportSource @emotion/react */
import React from 'react';
import { DifficultyRangeProps, difficultyArray } from './DifficultyRange.types';
import { base, box } from './DifficultyRange.styles';

export const DifficultyRange = ({
  difficulty = 1,
  dir = 'row',
  size = 'md',
  handler = (difficulty: number) => console.log(difficulty),
  children,
  ...props
}: DifficultyRangeProps) => {
  return (
    <div css={base(dir, size)} {...props}>
      {difficultyArray.map((diff: string, idx: number) => {
        return (
          <div
            key={idx}
            css={box(dir, size, idx + 1 <= difficulty && diff)}
            onClick={() => handler(idx + 1)}
          />
        );
      })}
      {children}
    </div>
  );
};
