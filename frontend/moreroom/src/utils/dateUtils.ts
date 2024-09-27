import dayjs, { Dayjs } from 'dayjs';
import { IHistoryCard } from '../types/historyTypes';

export const heads = ['일', '월', '화', '수', '목', '금', '토'];

export const getDays = (year: number, month: number) => {
  const days = [];
  let start = dayjs(`${year}-${month}-01`); // 이번 달 시작일

  let day = 1;
  for (let i = start.day(); i > 0; i--) {
    days.unshift(start.subtract(day, 'day'));
    day++;
  }

  day = 0;
  while (day < start.daysInMonth()) {
    days.push(start.add(day, 'day'));
    day++;
  }

  start = start.add(1, 'month');
  while (days.length % 7 != 0) {
    days.push(start);
    start = start.add(1, 'day');
  }

  const result = [];

  for (let i = 0; i < days.length; i += 7) {
    result.push(days.slice(i, i + 7));
  }

  return result;
};

export const getDateDiff = (date: string) => {
  const today = dayjs();
  const inputDate = dayjs(date);

  const dayDiff = today.diff(inputDate, 'day');
  const monthDiff = today.diff(inputDate, 'month');
  const yearDiff = today.diff(inputDate, 'year');

  if (dayDiff <= 30) return dayDiff + '일 전';
  else if (monthDiff <= 12) return monthDiff + '달 전';
  else return yearDiff + '년 전';
};

export const getHasContents = (contents: IHistoryCard[], date: Dayjs) => {
  let result = false;
  contents.forEach((content: IHistoryCard) => {
    if (dayjs(content.date).format('YYYY-MM-DD') === date.format('YYYY-MM-DD'))
      result = true;
  });
  return result;
};

export const getSelected = (date: Dayjs, store: Dayjs) => {
  if (date.format('YYYY-MM-DD') === store.format('YYYY-MM-DD')) return true;
  else return false;
};
