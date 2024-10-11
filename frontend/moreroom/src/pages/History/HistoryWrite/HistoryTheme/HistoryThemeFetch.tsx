/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { info, poster, row, themebox } from './styles';
import { useHistoryWriteStore } from '../../../../stores/historyStore';
import { useSuspenseQueries } from '@tanstack/react-query';
import { getThemeDetail } from '../../../../apis/themeApi';
import { getCafeForTheme } from '../../../../apis/cafeApi';
import { Typography } from '../../../../components/Typography';

export const HistoryThemeFetch = () => {
  const historyWriteStore = useHistoryWriteStore();
  const [imgErr, setImgErr] = useState<boolean>(false);
  const [themeQuery, cafeQuery] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['theme-detail'],
        queryFn: async () => await getThemeDetail(historyWriteStore.themeId!),
      },
      {
        queryKey: ['cafe-detail'],
        queryFn: async () => await getCafeForTheme(historyWriteStore.themeId!),
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
      {!imgErr ? (
        <img
          src={themeQuery.data.data.theme.poster}
          css={poster(imgErr)}
          onError={() => setImgErr(true)}
        />
      ) : (
        <div css={poster(imgErr)}>
          <Typography color="light" weight={500} size={0.875}>
            포스터를
          </Typography>
          <Typography color="light" weight={500} size={0.875}>
            준비중입니다
          </Typography>
        </div>
      )}
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
          {themeQuery.data.data.theme.description
            ? themeQuery.data.data.theme.description
            : '테마 스토리를 준비중입니다'}
        </Typography>
      </div>
    </div>
  );
};
