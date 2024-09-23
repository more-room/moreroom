import { create } from 'zustand';
import { ReactNode } from 'react';

type ModalStoreState = {
  isOpen: boolean;
  height: number;
  contents: ReactNode;
};

type ModalStoreAction = {
  setIsOpen: (isOpen: ModalStoreState['isOpen']) => void;
  setHeight: (height: ModalStoreState['height']) => void;
  setContents: (contents: ModalStoreState['contents']) => void;
};

export const useModalStore = create<ModalStoreState & ModalStoreAction>()(
  (set) => ({
    isOpen: false,
    height: 60,
    contents: undefined,
    setIsOpen: (isOpen) => set(() => ({ isOpen: isOpen })),
    setHeight: (height) => set(() => ({ height: height })),
    setContents: (contents) => set(() => ({ contents: contents })),
  }),
);
