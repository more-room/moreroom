import { ReactNode } from 'react';
import { IHistoryCard } from '../../types/historyTypes';
import { ColorScale, Palette } from '../../types/globalStyleTypes';

export interface HistoryCardProps extends React.ComponentProps<'div'> {
  history: IHistoryCard;
  bgColor?: Palette;
  bgColorScale?: ColorScale;
  children?: ReactNode;
}
