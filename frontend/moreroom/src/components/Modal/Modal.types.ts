import { ReactNode } from 'react';

export interface ModalProps extends React.ComponentProps<'div'> {
  height?: number;
  children?: ReactNode;
}
