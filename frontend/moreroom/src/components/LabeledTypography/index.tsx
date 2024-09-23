/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { LabeledTypographyProps } from './LabeledTypography.types';
import { Typography } from '../Typography';
import { css } from '@emotion/react';
import { base } from './LabeledTypography.styles';

export const LabeledTypography = ({
  str,
  pattern,
  normalColor = 'light',
  highlightColor = 'primary',
  weight = 400,
  size = 1,
  ...props
}: LabeledTypographyProps) => {
  return (
    <div css={base} {...props}>
      {str
        .split(new RegExp(`(${pattern})`, 'gi'))
        .map((s: string, idx: number) => {
          return (
            <Typography
              key={idx}
              color={
                s.toLowerCase() === pattern.toLowerCase()
                  ? highlightColor
                  : normalColor
              }
              weight={s.toLowerCase() === pattern.toLowerCase() ? 700 : weight}
              size={size}
            >
              {s}
            </Typography>
          );
        })}
    </div>
  );
};
