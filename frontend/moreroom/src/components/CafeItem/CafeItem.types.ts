import { ReactNode } from 'react';
import { ICafeListItem } from '../../types/cafeTypes';

export interface CafeItemProps extends React.ComponentProps<'div'> {
  cafe: ICafeListItem;
  pattern?: string;
  onList?: boolean;
  children?: ReactNode;
}
