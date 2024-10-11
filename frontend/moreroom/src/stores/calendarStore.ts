import dayjs, { Dayjs } from 'dayjs';
import { create } from 'zustand';

type CalendarStoreState = {
  bodyType: 'default' | 'year' | 'month';
  curYear: number;
  curMonth: number;
  selected?: Dayjs;
};

type CalendarStoreAction = {
  setBodyType: (type: CalendarStoreState['bodyType']) => void;
  setCurYear: (year: CalendarStoreState['curYear']) => void;
  setCurMonth: (month: CalendarStoreState['curMonth']) => void;
  setSelected: (selected: CalendarStoreState['selected']) => void;
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
  setSelected: (selected) => set(() => ({ selected: selected })),
}));
