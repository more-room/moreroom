import { Colors } from "./globalStyle";

// 디자인 스타일 (hover, actice, disabled 등..)

const ColorStyle = {
  primary: {
    main: Colors.primary['A200'],
    contrastText: '#fff',
    hover: Colors.primary['A400'],
    active: Colors.primary['A100'],
    disabled: Colors.primary['100'],
  },
  secondary: {
    main: Colors.secondary['200'],
    contrastText: '#fff',
    hover: Colors.secondary['500'],
    active: Colors.secondary['A100'],
    disabled: Colors.secondary['100'],
  },
  grey: {
    main: Colors.grey['500'],
    contrastText: '#fff',
    hover: Colors.grey['A200'],
    active: Colors.grey['300'],
    disabled: Colors.grey['300'],
  },
  danger: {
    main: Colors.danger['500'],
    contrastText: '#fff',
    hover: Colors.danger['A200'],
    active: Colors.danger['A100'],
    disabled: Colors.danger['200'],
  },
  dark: {
    main: Colors.dark['900'],
    contrastText: '#fff',
    hover: Colors.dark['700'],
    active: Colors.dark['500'],
    disabled: Colors.dark['300'],
  },
  light: {
    main: '#fff',
    contrastText: '#000',
    hover: '#f2f2f2',
    active: '#e4e4e4',
    disabled: '#eee',
  },
  text: {
    primary: Colors.primary['A200'],
    secondary: Colors.secondary['400'],
    danger:Colors.danger['A200'],
    grey:Colors.grey['600'],
    dark:Colors.light['900'],
    light:Colors.dark['900'],
    disabled: Colors.grey.A100,
  },
  background: {
    primary: Colors.primary['50'],
    secondary: Colors.secondary['50'],
    danger:Colors.danger['50'],
    grey:Colors.grey['200'],
    dark:Colors.dark['900'],
    light:Colors.light['900'],
  },
}

export default ColorStyle;