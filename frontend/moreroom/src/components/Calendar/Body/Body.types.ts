import { ReactNode } from 'react';

export interface BodyProps extends React.ComponentProps<'div'> {
  children?: ReactNode;
}
