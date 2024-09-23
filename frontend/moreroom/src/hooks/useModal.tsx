import React, { ReactNode } from 'react';
import { useModalStore } from '../stores/modalStore';

export const useModal = () => {
  const modalStore = useModalStore();

  const show = (contents: ReactNode, height?: number) => {
    if (height) modalStore.setHeight(height);
    modalStore.setContents(contents);
    modalStore.setIsOpen(true);
  };

  const hide = () => {
    modalStore.setIsOpen(false);
  };

  return { show, hide };
};
