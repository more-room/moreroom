import { ReactNode } from 'react';

export interface NotificationProps extends React.ComponentProps<'div'> {
  ment: string;
  type: 'confirm' | 'alert';
  twoBtn?: boolean;
  handler: () => void;
  outlinedHandler?: () => void;
  children?: ReactNode[];
}
