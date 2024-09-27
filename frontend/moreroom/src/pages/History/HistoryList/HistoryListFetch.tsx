/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { Calendar } from '../../../components/Calendar';
import { useCalendarStore } from '../../../stores/calendarStore';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getHistoryList } from '../../../apis/historyApi';
import { IHistoryCard } from '../../../types/historyTypes';
import { HistoryCard } from '../../../components/HistoryCard';
import { empty, list } from './styles';
import dayjs from 'dayjs';
import { Typography } from '../../../components/Typography';
import { Button } from '../../../components/Button';

export const HistoryListFetch = () => {
  const calendarStore = useCalendarStore();
  const historyQuery = useSuspenseQuery({
    queryKey: ['history-list'],
    queryFn: async () =>
      await getHistoryList({
        startDate: `${calendarStore.curYear}-${calendarStore.curMonth}-01`,
        endDate: `${calendarStore.curYear}-${calendarStore.curMonth}-${dayjs(`${calendarStore.curYear}-${calendarStore.curMonth}-01`).daysInMonth()}`,
      }),
  });

  if (historyQuery.error && !historyQuery.isFetching) {
    throw historyQuery.error;
  }

  const [history, setHistory] = useState<IHistoryCard[]>([]);

  useEffect(() => {
    let his: IHistoryCard[] = [];

    if (calendarStore.selected) {
      his = historyQuery.data.data.historyList.filter(
        (h: IHistoryCard) =>
          dayjs(h.date).format('YYYY-MM-DD') ===
          calendarStore.selected?.format('YYYY-MM-DD'),
      );
    } else {
      his = [...historyQuery.data.data.historyList];
    }

    setHistory(() => his);
  }, [calendarStore.selected]);

  return (
    <>
      <Calendar>
        <Calendar.Header />
        {calendarStore.bodyType === 'default' && (
          <Calendar.DefaultBody contents={historyQuery.data.data.historyList} />
        )}
        {calendarStore.bodyType === 'year' && <Calendar.YearBody />}
        {calendarStore.bodyType === 'month' && <Calendar.MonthBody />}
      </Calendar>
      <Typography
        color="light"
        weight={600}
        style={{ margin: '1rem 0 0 1rem' }}
      >
        {calendarStore.selected
          ? dayjs(calendarStore.selected).format('M월 D일') + '의 기록'
          : calendarStore.curMonth + '월의 기록'}
      </Typography>
      {history.length ? (
        <div css={list}>
          {history.map((history: IHistoryCard) => (
            <HistoryCard key={history.historyId} history={history} />
          ))}
        </div>
      ) : (
        <div css={empty}>
          <Typography color="light" weight={500} size={1.125}>
            등록된 기록이 없습니다
          </Typography>
          <Button rounded={0.5} handler={() => console.log('it"s add history')}>
            <Typography color="light" weight={600} size={0.875}>
              기록 등록하기
            </Typography>
          </Button>
        </div>
      )}
    </>
  );
};
