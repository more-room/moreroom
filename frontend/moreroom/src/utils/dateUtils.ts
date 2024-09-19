import dayjs from 'dayjs';

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
