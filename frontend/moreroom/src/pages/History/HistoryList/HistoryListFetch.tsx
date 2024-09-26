/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { Calendar } from '../../../components/Calendar';
import { useCalendarStore } from '../../../stores/calendarStore';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getHistoryList } from '../../../apis/historyApi';
import { IHistoryCard } from '../../../types/historyTypes';
import { HistoryCard } from '../../../components/HistoryCard';
import { list } from './styles';
import dayjs from 'dayjs';

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
      <div css={list}>
        {history.map((history: IHistoryCard) => (
          <HistoryCard key={history.historyId} history={history} />
        ))}
      </div>
    </>
  );
};
