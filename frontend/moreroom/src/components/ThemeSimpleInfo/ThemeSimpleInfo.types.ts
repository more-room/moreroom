import { ITheme } from "../../types/themeTypes";

export interface ThemeSimpleInfoProps extends React.ComponentProps<'div'> {
  theme?: ITheme,
}
