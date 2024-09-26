/** @jsxImportSource @emotion/react */
import React from 'react';
import { Calendar } from '../../../components/Calendar';
import { useCalendarStore } from '../../../stores/calendarStore';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getHistoryList } from '../../../apis/historyApi';
import { IHistoryCard } from '../../../types/historyTypes';
import { HistoryCard } from '../../../components/HistoryCard';
import { list } from './styles';

export const HistoryListFetch = () => {
  const historyQuery = useSuspenseQuery({
    queryKey: ['history-list'],
    queryFn: async () => await getHistoryList(),
  });

  if (historyQuery.error && !historyQuery.isFetching) {
    throw historyQuery.error;
  }

  const calendarType = useCalendarStore((state) => state.bodyType);

  return (
    <>
      <Calendar>
        <Calendar.Header />
        {calendarType === 'default' && <Calendar.DefaultBody />}
        {calendarType === 'year' && <Calendar.YearBody />}
        {calendarType === 'month' && <Calendar.MonthBody />}
      </Calendar>
      <div css={list}>
        {historyQuery.data.data.historyList.map((history: IHistoryCard) => (
          <HistoryCard key={history.historyId} history={history} />
        ))}
      </div>
    </>
  );
};
