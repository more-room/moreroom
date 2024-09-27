/** @jsxImportSource @emotion/react */
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getHistoryDetail } from '../../../apis/historyApi';
import { getThemeDetail } from '../../../apis/themeApi';
import { container, poster, row } from './styles';
import { TopBar } from '../../../components/TopBar';
import { HistoryThemeInfo } from './HistoryThemeInfo';
import { HistoryInfo } from './HistoryInfo';
import { HistoryMemo } from './HistoryMemo';
import { Button } from '../../../components/Button';
import { Typography } from '../../../components/Typography';

export const HistoryDetailFetch = () => {
  const nav = useNavigate();
  const params = useParams();
  const historyQuery = useSuspenseQuery({
    queryKey: ['history-detail'],
    queryFn: async () => await getHistoryDetail(Number(params.historyId)),
  });
  const themeQuery = useQuery({
    queryKey: ['theme-detail'],
    queryFn: async () => await getThemeDetail(historyQuery.data.data.themeId),
    enabled: false,
  });

  useEffect(() => {
    themeQuery.refetch();
  }, []);

  return (
    <div css={container}>
      <TopBar style={{ position: 'absolute', top: '0' }}>
        <TopBar.Title
          type="default"
          title={themeQuery.data?.data.theme.title + ' 기록'}
          backHandler={() => nav(-1)}
        />
      </TopBar>
      <img src={themeQuery.data?.data.theme.poster} css={poster} />
      {themeQuery.data && (
        <HistoryThemeInfo
          cafeName={historyQuery.data.data.cafeName}
          theme={themeQuery.data?.data.theme}
        />
      )}
      <HistoryInfo history={historyQuery.data.data} />
      <HistoryMemo memo={historyQuery.data.data.content} />
      <div css={row}>
        <Button
          rounded={0.5}
          handler={() => console.log('edit')}
          style={{ padding: '0.5rem 2rem' }}
        >
          <Typography color="light" weight={600} size={0.875}>
            수정하기
          </Typography>
        </Button>
        <Button
          color="danger"
          rounded={0.5}
          handler={() => console.log('remove')}
          style={{ padding: '0.5rem 2rem' }}
        >
          <Typography color="light" weight={600} size={0.875}>
            삭제하기
          </Typography>
        </Button>
      </div>
    </div>
  );
};
