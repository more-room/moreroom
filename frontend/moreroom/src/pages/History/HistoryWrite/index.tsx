/** @jsxImportSource @emotion/react */
import React from 'react';
import { container } from './styles';
import { HistoryInfo } from './HistoryInfo';
import { TopBar } from '../../../components/TopBar';
import { useNavigate, useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { useHistoryWriteStore } from '../../../stores/historyStore';
import { HistoryTheme } from './HistoryTheme';
import { HistoryMemo } from './HistoryMemo';
import { Button } from '../../../components/Button';
import { Typography } from '../../../components/Typography';
import { useMutation } from '@tanstack/react-query';
import { addHistory } from '../../../apis/historyApi';

export const HistoryWrite = () => {
  const nav = useNavigate();
  const params = useParams();
  const historyWriteStore = useHistoryWriteStore();
  const { mutate } = useMutation({
    mutationFn: async () =>
      await addHistory({
        themeId: historyWriteStore.themeId,
        content: historyWriteStore.content,
        date: historyWriteStore.date,
        hintCount: historyWriteStore.hintCount,
        memberLevel: historyWriteStore.memberLevel,
        memberPlayTime: historyWriteStore.memberPlayTime,
        players: historyWriteStore.players,
        price: historyWriteStore.price,
        successFlag: historyWriteStore.successFlag,
      }),
    onSuccess: () => nav('/history'),
    onError: () => alert('오류 발생'),
  });

  const handleWrite = () => {
    if (
      Object.keys(historyWriteStore).filter((v: string) => !v.includes('set'))
        .length < 9
    )
      console.log('등록 불가');
    else mutate();
  };

  return (
    <div css={container}>
      <TopBar
        css={css`
          position: ${params.historyId || historyWriteStore.themeId
            ? 'absolute'
            : 'static'};
        `}
      >
        <TopBar.Title
          type="withoutRight"
          title="기록 작성"
          backHandler={() => nav(-1)}
        />
      </TopBar>
      <HistoryTheme />
      <HistoryInfo />
      <HistoryMemo />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '1rem',
        }}
      >
        <Button
          rounded={0.5}
          handler={() => handleWrite()}
          style={{ padding: '0.5rem 3rem' }}
        >
          <Typography color="light" size={0.875}>
            작성하기
          </Typography>
        </Button>
      </div>
    </div>
  );
};
