import { ReactNode } from 'react';
import { IHistoryCard } from '../../../types/historyTypes';

export interface BodyProps extends React.ComponentProps<'div'> {
  contents?: IHistoryCard[];
  children?: ReactNode;
}
