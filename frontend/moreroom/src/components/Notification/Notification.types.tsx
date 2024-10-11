import { ReactNode } from 'react';

export interface NotificationProps extends React.ComponentProps<'div'> {
  ment: string;
  type: 'confirm' | 'alert';
  xbtn?: boolean;
  twoBtn?: boolean;
  handler: () => void;
  xhandler?: () => void;
  outlinedHandler?: () => void;
  children?: ReactNode[];
}
