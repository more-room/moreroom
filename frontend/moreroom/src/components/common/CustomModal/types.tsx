import { ReactNode } from 'react';

export interface NotificationProps extends React.ComponentProps<'div'> {
  ment: ReactNode;
  type: 'confirm' | 'alert';
  twoBtn?: boolean;
  handler: () => void;
  xhandler?: () => void;
  outlinedHandler?: () => void;
  children?: ReactNode[];
}
