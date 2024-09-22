import { IThemeListItem } from '../../types/themeTypes';

export interface ThemeItemProps extends React.ComponentProps<'div'> {
  theme: IThemeListItem;
  pattern?: string;
}

// props 서치용인지 보는용인지 추가
