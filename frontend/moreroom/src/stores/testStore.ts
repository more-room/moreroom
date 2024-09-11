import { create } from 'zustand';

type TestStore = {
  testNum: number;
  testInc: () => void;
};

export const useTestStore = create<TestStore>()((set) => ({
  testNum: 1,
  testInc: () => set((state) => ({ testNum: state.testNum + 1 })),
}));
