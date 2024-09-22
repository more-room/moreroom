import { IThemeCommon } from '../../types/themeTypes';

export interface ThemeSimpleInfoProps extends React.ComponentProps<'div'> {
  theme: IThemeCommon;
}
