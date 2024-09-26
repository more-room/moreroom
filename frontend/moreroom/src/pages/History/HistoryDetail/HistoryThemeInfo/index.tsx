/** @jsxImportSource @emotion/react */
import React from 'react';
import { container, row } from './styles';
import { Typography } from '../../../../components/Typography';
import { IThemeDetailItem } from '../../../../types/themeTypes';

interface HistoryThemeInfoProps {
  cafeName: string;
  theme: IThemeDetailItem;
}

export const HistoryThemeInfo = ({
  cafeName,
  theme,
}: HistoryThemeInfoProps) => {
  return (
    <div css={container}>
      <div css={row}>
        <Typography color="light" weight={600}>
          {theme.title}
        </Typography>
        <Typography color="grey" weight={400} size={0.75}>
          {cafeName}
        </Typography>
      </div>
      <Typography
        color="light"
        weight={400}
        size={0.75}
        style={{ marginTop: '1rem' }}
      >
        {theme.description}
      </Typography>
    </div>
  );
};
