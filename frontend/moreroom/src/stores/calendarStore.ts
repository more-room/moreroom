import dayjs from 'dayjs';
import { create } from 'zustand';

type CalendarStoreState = {
  bodyType: 'default' | 'year' | 'month';
  curYear: number;
  curMonth: number;
};

type CalendarStoreAction = {
  setBodyType: (type: CalendarStoreState['bodyType']) => void;
  setCurYear: (year: CalendarStoreState['curYear']) => void;
  setCurMonth: (month: CalendarStoreState['curMonth']) => void;
};

export const useCalendarStore = create<
  CalendarStoreState & CalendarStoreAction
>()((set) => ({
  bodyType: 'default',
  curYear: dayjs().year(),
  curMonth: dayjs().month() + 1,
  setBodyType: (type) => set(() => ({ bodyType: type })),
  setCurYear: (year) => set(() => ({ curYear: year })),
  setCurMonth: (month) => set(() => ({ curMonth: month })),
}));
