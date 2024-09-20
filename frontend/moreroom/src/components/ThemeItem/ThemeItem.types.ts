import { ReactNode } from 'react';
import { IThemeListInfo } from '../../types/themeTypes';

export interface ThemeItemProps extends React.ComponentProps<'div'> {
  theme: IThemeListInfo;
  pattern?: string;
}

// props 서치용인지 보는용인지 추가
