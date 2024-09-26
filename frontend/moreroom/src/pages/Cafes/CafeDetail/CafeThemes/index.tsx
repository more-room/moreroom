/** @jsxImportSource @emotion/react */
import React from 'react';
import { IThemeCommon } from '../../../../types/themeTypes';
import { container, list, row } from './styles';
import { Typography } from '../../../../components/Typography';
import { ThemeSimpleInfo } from '../../../../components/ThemeSimpleInfo';
import { StarIcon } from '@heroicons/react/24/solid';
import { Icon } from '../../../../components/Icon';

interface CafeThemesProps {
  themes: IThemeCommon[];
}
export const CafeThemes = ({ themes }: CafeThemesProps) => {
  return (
    <div css={container}>
      <Typography color="light" size={0.875} weight={400}>
        플레이 할 수 있는 테마
      </Typography>
      <div css={list}>
        {themes.map((theme: IThemeCommon) => {
          return (
            <div>
              <ThemeSimpleInfo
                theme={theme}
                style={{ backgroundColor: '#212121' }}
              />
              <div css={row}>
                <Icon color="secondary">
                  <StarIcon />
                </Icon>
                <Typography color="secondary" size={0.75} weight={400}>
                  {theme.review.score.toFixed(1)}({theme.review.count})
                </Typography>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
