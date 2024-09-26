/** @jsxImportSource @emotion/react */
import React from 'react';
import { container, themelist } from './styles';
import { Typography } from '../../../components/Typography';
import { IThemeListItem, IThemeRecommendList } from '../../../types/themeTypes';
import { ThemeSimpleInfo } from '../../../components/ThemeSimpleInfo';
import { StarPoint } from '../../../components/StarPoint';
import { useNavigate } from 'react-router-dom';

export interface ThemeListProps {
  title: string;
  themes: IThemeRecommendList;
}

export const ThemeList = ({ title, themes }: ThemeListProps) => {
  const nav = useNavigate();

  return (
    <div css={container}>
      <Typography color="light" size={0.875} weight={600}>
        {title}
      </Typography>
      <div css={themelist}>
        {themes.themeList.map((theme: IThemeListItem) => {
          return (
            <div
              key={theme.themeId}
              onClick={() =>
                nav('/theme/detail', { state: { themeId: theme.themeId } })
              }
            >
              <ThemeSimpleInfo theme={theme} />
              <StarPoint color="secondary" iconSize={0.875} numberSize={0.75}>
                {theme.review.score}
              </StarPoint>
            </div>
          );
        })}
      </div>
    </div>
  );
};
