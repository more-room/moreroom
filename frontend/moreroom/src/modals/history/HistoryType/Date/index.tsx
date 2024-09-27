/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { container, input, row } from './styles';
import { useHistoryWriteStore } from '../../../../stores/historyStore';
import { Typography } from '../../../../components/Typography';
import dayjs from 'dayjs';

export const Date = () => {
  const historyWriteStore = useHistoryWriteStore();
  const [year, setYear] = useState<number>(dayjs().year());
  const [month, setMonth] = useState<number>(dayjs().month() + 1);
  const [day, setDay] = useState<number>(dayjs().date());
  const [hour, setHour] = useState<number>(dayjs().hour());
  const [minute, setMinute] = useState<number>(dayjs().minute());

  useEffect(() => {
    if (historyWriteStore.date) {
      setYear(dayjs(historyWriteStore.date).year());
      setMonth(dayjs(historyWriteStore.date).month() + 1);
      setDay(dayjs(historyWriteStore.date).date());
      setHour(dayjs(historyWriteStore.date).hour());
      setMinute(dayjs(historyWriteStore.date).minute());
    }
  }, []);

  useEffect(() => {
    historyWriteStore.setDate(`${year}-${month}-${day} ${hour}:${minute}`);
  }, [year, month, day, hour, minute]);

  return (
    <div css={container}>
      <div css={row(1)}>
        <div css={row(0.5)}>
          <input
            css={input}
            type="number"
            defaultValue={year}
            min={2010}
            max={dayjs().year()}
            onChange={(e) => setYear(Number(e.target.value))}
          />
          <Typography color="light" weight={500} size={1}>
            년
          </Typography>
        </div>
        <div css={row(0.5)}>
          <input
            css={input}
            type="number"
            defaultValue={month}
            min={1}
            max={12}
            onChange={(e) => setMonth(Number(e.target.value))}
          />
          <Typography color="light" weight={500} size={1}>
            월
          </Typography>
        </div>
        <div css={row(0.5)}>
          <input
            css={input}
            type="number"
            defaultValue={day}
            min={1}
            max={dayjs(`${year}-${month}`).daysInMonth()}
            onChange={(e) => setDay(Number(e.target.value))}
          />
          <Typography color="light" weight={500} size={1}>
            일
          </Typography>
        </div>
      </div>
      <div css={row(1)}>
        <div css={row(0.5)}>
          <input
            css={input}
            type="number"
            defaultValue={hour}
            min={0}
            max={23}
            onChange={(e) => setHour(Number(e.target.value))}
          />
          <Typography color="light" weight={500} size={1}>
            시
          </Typography>
        </div>
        <div css={row(0.5)}>
          <input
            css={input}
            type="number"
            defaultValue={minute}
            min={0}
            max={59}
            onChange={(e) => setMinute(Number(e.target.value))}
          />
          <Typography color="light" weight={500} size={1}>
            분
          </Typography>
        </div>
      </div>
    </div>
  );
};
