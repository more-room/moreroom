/** @jsxImportSource @emotion/react */
import React from 'react';
import { info, poster, row, themebox } from './styles';
import { useHistoryWriteStore } from '../../../../stores/historyStore';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
import { getThemeDetail } from '../../../../apis/themeApi';
import { getCafeForTheme } from '../../../../apis/cafeApi';
import { Typography } from '../../../../components/Typography';

export const HistoryThemeFetch = () => {
  const historyWriteStore = useHistoryWriteStore();
  const [themeQuery, cafeQuery] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['theme-detail'],
        queryFn: async () =>
          await getThemeDetail(
            process.env.NODE_ENV === 'development'
              ? 1
              : historyWriteStore.themeId!,
          ),
      },
      {
        queryKey: ['cafe-detail'],
        queryFn: async () =>
          await getCafeForTheme(
            process.env.NODE_ENV === 'development'
              ? 1
              : historyWriteStore.themeId!,
          ),
      },
    ],
  });

  [themeQuery, cafeQuery].some((query) => {
    if (query.error && !query.isFetching) {
      throw query.error;
    }
  });

  return (
    <div css={themebox}>
      <img src={themeQuery.data.data.theme.poster} css={poster} />
      <div css={info}>
        <div css={row}>
          <Typography color="light" weight={600}>
            {themeQuery.data.data.theme.title}
          </Typography>
          <Typography color="grey" weight={400} size={0.75}>
            {cafeQuery.data.data.brandName} {cafeQuery.data.data.branchName}
          </Typography>
        </div>
        <Typography
          color="light"
          weight={400}
          size={0.75}
          style={{ marginTop: '1rem' }}
        >
          {themeQuery.data.data.theme.description}
        </Typography>
      </div>
    </div>
  );
};
