import { ReactNode } from 'react';

export type TDate = 'default' | 'disable' | 'sun' | 'sat';

export interface DateProps extends React.ComponentProps<'div'> {
  date: number;
  type?: TDate;
  selected?: boolean;
  hasContents?: boolean;
  children?: ReactNode;
}
