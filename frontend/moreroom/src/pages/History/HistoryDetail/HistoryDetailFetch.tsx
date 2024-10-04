/** @jsxImportSource @emotion/react */
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { delHistory, getHistoryDetail } from '../../../apis/historyApi';
import { getThemeDetail } from '../../../apis/themeApi';
import { container, poster, row } from './styles';
import { TopBar } from '../../../components/TopBar';
import { HistoryThemeInfo } from './HistoryThemeInfo';
import { HistoryInfo } from './HistoryInfo';
import { HistoryMemo } from './HistoryMemo';
import { Button } from '../../../components/Button';
import { Typography } from '../../../components/Typography';
import { useHistoryWriteStore } from '../../../stores/historyStore';
import dayjs from 'dayjs';

export const HistoryDetailFetch = () => {
  const nav = useNavigate();
  const params = useParams();
  const queryClient = useQueryClient();
  const historyWriteStore = useHistoryWriteStore();
  const historyQuery = useSuspenseQuery({
    queryKey: ['history-detail'],
    queryFn: async () => await getHistoryDetail(Number(params.historyId)),
  });
  const themeQuery = useQuery({
    queryKey: ['theme-detail'],
    queryFn: async () => await getThemeDetail(historyQuery.data.data.themeId),
    enabled: false,
  });
  const { mutate } = useMutation({
    mutationFn: async () => await delHistory(historyQuery.data.data.historyId),
    onSuccess: () => nav('/history'),
    onError: () => alert('오류 발생'),
  });

  const handleEdit = () => {
    historyWriteStore.setContent(historyQuery.data.data.content);
    historyWriteStore.setDate(
      dayjs(historyQuery.data.data.date).format('YYYY-MM-DD HH:mm'),
    );
    historyWriteStore.setHintCount(historyQuery.data.data.hintCount);
    historyWriteStore.setMemberLevel(historyQuery.data.data.memberLevel);
    historyWriteStore.setMemberPlayTime(historyQuery.data.data.memberPlayTime);
    historyWriteStore.setPlayers(historyQuery.data.data.players);
    historyWriteStore.setPrice(historyQuery.data.data.price);
    historyWriteStore.setSuccessFlag(historyQuery.data.data.successFlag);
    historyWriteStore.setThemeId(historyQuery.data.data.themeId);
    nav(`/history/edit/${historyQuery.data.data.historyId}`);
  };

  useEffect(() => {
    themeQuery.refetch();
  }, []);

  return (
    <div css={container}>
      <TopBar style={{ position: 'fixed' }}>
        <TopBar.Title
          type="default"
          title={themeQuery.data?.data.theme.title + ' 기록'}
          backHandler={() => nav('/history')}
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
          handler={() => handleEdit()}
          style={{ padding: '0.5rem 2rem' }}
        >
          <Typography color="light" weight={600} size={0.875}>
            수정하기
          </Typography>
        </Button>
        <Button
          color="danger"
          rounded={0.5}
          handler={() => {
            mutate();
            queryClient.invalidateQueries({ queryKey: ['history-list'] });
          }}
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
