import { ReactNode } from 'react';

export interface NotificationProps extends React.ComponentProps<'div'> {
  ment: string;
  type: 'confirm' | 'alert';
  handler: () => void;
  children?: ReactNode;
}
