/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useSuspenseQueries } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getThemeDetail } from '../../../apis/themeApi';
import { getCafeForTheme } from '../../../apis/cafeApi';
import { getExternalReview, getReviewForTheme } from '../../../apis/reviewApi';
import { container, description, posters } from './styles';
import { TopBar } from '../../../components/TopBar';
import { ThemeInfo } from './ThemeInfo';
import { ThemePlayInfo } from './ThemePlayInfo';
import { Typography } from '../../../components/Typography';
import { ThemeReview } from './ThemeReview';
import { ThemeCafe } from './ThemeCafe';

export const ThemeDetailFetch = () => {
  const themeIdDetail = Number(useParams().themeId);
  const navigate = useNavigate();

  const [themeQuery, cafeQuery, reviewQuery, exQuery] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['theme-detail'],
        queryFn: async () => await getThemeDetail(themeIdDetail),
      },
      {
        queryKey: ['theme-cafe'],
        queryFn: async () => await getCafeForTheme(themeIdDetail),
      },
      {
        queryKey: ['theme-review'],
        queryFn: async () =>
          await getReviewForTheme({
            themeId: themeIdDetail,
            pageNumber: 0,
          }),
      },
      {
        queryKey: ['theme-review-ex'],
        queryFn: async () =>
          await getExternalReview({ themeId: themeIdDetail, pageNumber: 0 }),
      },
    ],
  });

  [themeQuery, cafeQuery, reviewQuery, exQuery].some((query) => {
    if (query.error && !query.isFetching) {
      throw query.error;
    }
  });

  const [imgErr, setImgErr] = useState<boolean>(false);
  const themeId = themeQuery.data.data.theme.themeId;
  const title = themeQuery.data.data.theme.title;
  const playtime = themeQuery.data.data.theme.playtime;
  const genreList = themeQuery.data.data.theme.genreList;
  const review = themeQuery.data.data.theme.review;
  const poster = themeQuery.data.data.theme.poster;
  const regionId = cafeQuery.data.data.regionId;
  const cafeId = cafeQuery.data.data.cafeId;
  const brandName = cafeQuery.data.data.brandName;
  const branchName = cafeQuery.data.data.branchName;
  const cafeName = cafeQuery.data.data.cafeName;
  const address = cafeQuery.data.data.address;

  return (
    <div css={container}>
      <TopBar style={{ position: imgErr ? 'static' : 'fixed' }}>
        <TopBar.Title
          type="default"
          title={themeQuery.data.data.theme.title}
          backHandler={() => navigate(-1)}
        />
        <TopBar.Right handler={() => console.log('it"s notification')} />
      </TopBar>
      {!imgErr ? (
        <img
          src={themeQuery.data.data.theme.poster}
          css={posters(imgErr)}
          onError={() => setImgErr(true)}
        />
      ) : (
        <div css={posters(imgErr)}>
          <Typography color="light" weight={600} size={1.5}>
            포스터를
          </Typography>
          <Typography color="light" weight={600} size={1.5}>
            준비중입니다
          </Typography>
        </div>
      )}
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
          {themeQuery.data.data.theme.description
            ? themeQuery.data.data.theme.description
            : '테마 스토리를 준비중입니다'}
        </Typography>
      </div>
      <ThemeReview
        review={reviewQuery.data.data.content[0]}
        exReview={exQuery.data.data.content[0]}
        cafe={cafeQuery.data.data}
        onClickReview={() =>
          navigate('/review', {
            state: {
              themeId,
              title,
              playtime,
              genreList,
              review,
              poster,
              regionId,
              cafeId,
              brandName,
              branchName,
              address,
              cafeName
            },
          })
        }
      />
      <ThemeCafe cafe={cafeQuery.data.data} />
    </div>
  );
};
