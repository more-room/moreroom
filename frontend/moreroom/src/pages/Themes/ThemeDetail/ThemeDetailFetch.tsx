/** @jsxImportSource @emotion/react */
import React from 'react';
import { useSuspenseQueries } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { getThemeDetail } from '../../../apis/themeApi';
import { getCafeForTheme } from '../../../apis/cafeApi';
import { getReviewForTheme } from '../../../apis/reviewApi';
import { container, description, posters } from './styles';
import { TopBar } from '../../../components/TopBar';
import { ThemeInfo } from './ThemeInfo';
import { ThemePlayInfo } from './ThemePlayInfo';
import { Typography } from '../../../components/Typography';
import { ThemeReview } from './ThemeReview';
import { ThemeCafe } from './ThemeCafe';

export const ThemeDetailFetch = () => {
  const loc = useLocation();
  const navigate = useNavigate();

  const [themeQuery, cafeQuery, reviewQuery] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['theme-detail'],
        queryFn: async () =>
          await getThemeDetail(
            process.env.NODE_ENV === 'development' ? loc.state.themeId : loc.state.themeId,
          ),
      },
      {
        queryKey: ['theme-cafe'],
        queryFn: async () =>
          await getCafeForTheme(
            process.env.NODE_ENV === 'development' ? loc.state.themeId : loc.state.themeId,
          ),
      },
      {
        queryKey: ['theme-review'],
        queryFn: async () =>
          await getReviewForTheme({
            themeId:
              process.env.NODE_ENV === 'development' ? loc.state.themeId : loc.state.themeId,
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

  
  const themeId = themeQuery.data.data.theme.themeId;
  const title = themeQuery.data.data.theme.title;
  const playtime = themeQuery.data.data.theme.playtime;
  const genreList = themeQuery.data.data.theme.genreList;
  const review = themeQuery.data.data.theme.review;
  const poster = themeQuery.data.data.theme.poster
  const regionId = cafeQuery.data.data.regionId
  const cafeId = cafeQuery.data.data.cafeId
  const brandName = cafeQuery.data.data.brandName
  const branchName = cafeQuery.data.data.branchName
  const address = cafeQuery.data.data.address
  

  return (
    <div css={container}>
      <TopBar style={{ position: 'absolute' }}>
        <TopBar.Title type="default" title={themeQuery.data.data.theme.title} />
        <TopBar.Right handler={() => console.log('it"s notification')} />
      </TopBar>
      <img src={themeQuery.data.data.theme.poster} css={posters} />
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
        onClickReview={() => navigate('/review', { state: { themeId, title, playtime, genreList, review, poster, regionId, cafeId, brandName, branchName, address } })}
      />
      <ThemeCafe cafe={cafeQuery.data.data} />
    </div>
  );
};
