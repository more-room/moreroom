/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { Calendar } from '../../../components/Calendar';
import { useCalendarStore } from '../../../stores/calendarStore';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getHistoryList } from '../../../apis/historyApi';
import { IHistoryCard, IHistoryList } from '../../../types/historyTypes';
import { HistoryCard } from '../../../components/HistoryCard';
import { empty, list } from './styles';
import dayjs from 'dayjs';
import { Typography } from '../../../components/Typography';
import { Button } from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useHistoryWriteStore } from '../../../stores/historyStore';

export const HistoryListFetch = () => {
  const nav = useNavigate();
  const calendarStore = useCalendarStore();
  const historyWriteStore = useHistoryWriteStore();
  const historyQuery = useSuspenseQuery({
    queryKey: ['history-list'],
    queryFn: async () =>
      await getHistoryList({
        startDate: `${calendarStore.curYear}-${calendarStore.curMonth.toString().length === 1 ? '0' + calendarStore.curMonth : calendarStore.curMonth}-01`,
        endDate: `${calendarStore.curYear}-${calendarStore.curMonth.toString().length === 1 ? '0' + calendarStore.curMonth : calendarStore.curMonth}-${dayjs(`${calendarStore.curYear}-${calendarStore.curMonth}-01`).daysInMonth()}`,
      }),
  });

  if (historyQuery.error && !historyQuery.isFetching) {
    throw historyQuery.error;
  }

  const [history, setHistory] = useState<IHistoryCard[]>([]);

  const handleData = (historyList: IHistoryList) => {
    let his: IHistoryCard[] = [];
    if (calendarStore.selected) {
      his = historyList.historyList.filter(
        (h: IHistoryCard) =>
          dayjs(h.date).format('YYYY-MM-DD') ===
          calendarStore.selected?.format('YYYY-MM-DD'),
      );
    } else {
      his = [...historyList.historyList];
    }
    setHistory(() => his);
  };

  useEffect(() => {
    handleData(historyQuery.data.data);
  }, [calendarStore.selected]);

  useEffect(() => {
    historyQuery.refetch().then((res) => handleData(res.data?.data!));
  }, [calendarStore.curYear, calendarStore.curMonth]);

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
            <HistoryCard
              key={history.historyId}
              history={history}
              onClick={() => nav(`/history/detail/${history.historyId}`)}
            />
          ))}
          <Button
            rounded={0.5}
            handler={() => {
              historyWriteStore.setDate(
                calendarStore.selected
                  ? calendarStore.selected.format('YYYY-MM-DD')
                  : dayjs(
                      `${calendarStore.curYear}-${calendarStore.curMonth}-01`,
                    ).format('YYYY-MM-DD'),
              );
              nav('/history/write');
            }}
          >
            <Typography color="light" weight={600} size={0.875}>
              기록 등록하기
            </Typography>
          </Button>
        </div>
      ) : (
        <div css={empty}>
          <Typography color="light" weight={500} size={1.125}>
            등록된 기록이 없습니다
          </Typography>
          <Button
            rounded={0.5}
            handler={() => {
              historyWriteStore.setDate(
                calendarStore.selected
                  ? calendarStore.selected.format('YYYY-MM-DD')
                  : dayjs(
                      `${calendarStore.curYear}-${calendarStore.curMonth}-01`,
                    ).format('YYYY-MM-DD'),
              );
              nav('/history/write');
            }}
          >
            <Typography color="light" weight={600} size={0.875}>
              기록 등록하기
            </Typography>
          </Button>
        </div>
      )}
    </>
  );
};
