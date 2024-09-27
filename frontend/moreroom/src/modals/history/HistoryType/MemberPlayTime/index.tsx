/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { container, input, row } from './styles';
import { useHistoryWriteStore } from '../../../../stores/historyStore';
import { Typography } from '../../../../components/Typography';

export const MemberPlayTime = () => {
  const historyWriteStore = useHistoryWriteStore();
  const [minute, setMinute] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);

  useEffect(() => {
    if (historyWriteStore.memberPlayTime) {
      setMinute(Math.floor(historyWriteStore.memberPlayTime / 60));
      setSecond(historyWriteStore.memberPlayTime % 60);
    }
  }, []);

  useEffect(() => {
    historyWriteStore.setMemberPlayTime(minute * 60 + second);
  }, [minute, second]);

  return (
    <div css={[container, row(1)]}>
      <div css={row(0.5)}>
        <input
          css={input}
          type="number"
          defaultValue={minute}
          min={0}
          max={1000}
          onChange={(e) => setMinute(Number(e.target.value))}
        />
        <Typography color="light" weight={500} size={1}>
          분
        </Typography>
      </div>
      <div css={row(0.5)}>
        <input
          css={input}
          type="number"
          defaultValue={second}
          min={0}
          max={1000}
          onChange={(e) => setSecond(Number(e.target.value))}
        />
        <Typography color="light" weight={500} size={1}>
          초
        </Typography>
      </div>
    </div>
  );
};
