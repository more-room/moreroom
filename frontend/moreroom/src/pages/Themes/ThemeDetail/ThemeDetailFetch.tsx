/** @jsxImportSource @emotion/react */
import React from 'react';
import { useSuspenseQueries } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { getThemeDetail } from '../../../apis/themeApi';
import { getCafeForTheme } from '../../../apis/cafeApi';
import { getReviewForTheme } from '../../../apis/reviewApi';
import { container, description, poster } from './styles';
import { TopBar } from '../../../components/TopBar';
import { ThemeInfo } from './ThemeInfo';
import { ThemePlayInfo } from './ThemePlayInfo';
import { Typography } from '../../../components/Typography';
import { ThemeReview } from './ThemeReview';
import { ThemeCafe } from './ThemeCafe';

export const ThemeDetailFetch = () => {
  const loc = useLocation();
  const [themeQuery, cafeQuery, reviewQuery] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['theme-detail'],
        queryFn: async () =>
          await getThemeDetail(
            process.env.NODE_ENV === 'development' ? 1 : loc.state.themeId,
          ),
      },
      {
        queryKey: ['theme-cafe'],
        queryFn: async () =>
          await getCafeForTheme(
            process.env.NODE_ENV === 'development' ? 1 : loc.state.themeId,
          ),
      },
      {
        queryKey: ['theme-review'],
        queryFn: async () =>
          await getReviewForTheme({
            themeId:
              process.env.NODE_ENV === 'development' ? 1 : loc.state.themeId,
            pageNumber: 0,
          }),
      },
    ],
  });

  [themeQuery, cafeQuery, reviewQuery].some((query) => {
    if (query.error && !query.isFetching) {
      throw query.error;
    }
  });

  return (
    <div css={container}>
      <TopBar style={{ position: 'absolute' }}>
        <TopBar.Title type="default" title={themeQuery.data.data.theme.title} />
        <TopBar.Right handler={() => console.log('it"s notification')} />
      </TopBar>
      <img src={themeQuery.data.data.theme.poster} css={poster} />
      <ThemeInfo
        theme={themeQuery.data.data.theme}
        cafe={cafeQuery.data.data}
      />
      <ThemePlayInfo theme={themeQuery.data.data.theme} />
      <Typography
        color="light"
        weight={700}
        style={{ marginTop: '2rem', marginLeft: '1rem' }}
      >
        테마 스토리
      </Typography>
      <div css={description}>
        <Typography color="light" size={0.875} weight={400}>
          {themeQuery.data.data.theme.description}
        </Typography>
      </div>
      <ThemeReview
        review={reviewQuery.data.data.content[0]}
        cafe={cafeQuery.data.data}
      />
      <ThemeCafe cafe={cafeQuery.data.data} />
    </div>
  );
};
