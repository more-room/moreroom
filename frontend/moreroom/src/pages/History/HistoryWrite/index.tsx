/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
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
import { addHistory, editHistory } from '../../../apis/historyApi';
import { IHistoryWrite } from '../../../types/historyTypes';

export const HistoryWrite = () => {
  const nav = useNavigate();
  const params = useParams();
  const [historyInfo, setHistoryInfo] = useState<IHistoryWrite>({});
  const historyWriteStore = useHistoryWriteStore();
  const { mutate } = useMutation({
    mutationFn: async (type: string) =>
      type === 'add'
        ? await addHistory(historyInfo)
        : await editHistory(
            historyInfo,
            process.env.NODE_ENV === 'development'
              ? 1
              : Number(params.historyId),
          ),
    onSuccess: () => {
      useHistoryWriteStore.persist.clearStorage();
      nav('/history');
    },
    onError: () => alert('오류 발생'),
  });

  const handleWrite = () => {
    if (
      Object.keys(historyWriteStore).filter((v: string) => !v.includes('set'))
        .length < 9
    )
      console.log('등록 불가');
    else {
      mutate(params.historyId ? 'edit' : 'add');
    }
  };

  useEffect(() => {
    setHistoryInfo({
      themeId: historyWriteStore.themeId,
      content: historyWriteStore.content,
      date: historyWriteStore.date,
      hintCount: historyWriteStore.hintCount,
      memberLevel: historyWriteStore.memberLevel,
      memberPlayTime: historyWriteStore.memberPlayTime,
      players: historyWriteStore.players,
      price: historyWriteStore.price,
      successFlag: historyWriteStore.successFlag,
    });
  }, [historyWriteStore]);

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
