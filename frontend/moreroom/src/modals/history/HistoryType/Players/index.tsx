/** @jsxImportSource @emotion/react */
import React from 'react';
import { container, input, row } from './styles';
import { useHistoryWriteStore } from '../../../../stores/historyStore';
import { Typography } from '../../../../components/Typography';

export const Players = () => {
  const historyWriteStore = useHistoryWriteStore();

  return (
    <div css={[container, row(0.5)]}>
      <input
        css={input}
        type="number"
        defaultValue={historyWriteStore.players ? historyWriteStore.players : 0}
        min={1}
        max={100}
        onChange={(e) => historyWriteStore.setPlayers(Number(e.target.value))}
      />
      <Typography color="light" weight={500} size={1}>
        명
      </Typography>
    </div>
  );
};
