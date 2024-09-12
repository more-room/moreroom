import { TTopBar } from '../TopBar.types';

export interface TitleProps {
  type: TTopBar;
  backHandler?: () => void;
  title?: string;
  searchHandler?: (value: string) => void;
}
