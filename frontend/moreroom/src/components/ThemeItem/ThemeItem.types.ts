import { IThemeListItem } from '../../types/themeTypes';

export interface ThemeItemProps extends React.ComponentProps<'div'> {
  theme: IThemeListItem;
  pattern?: string;
}

