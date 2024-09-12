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
    primary: '#000',
    secondary: Colors.grey['700'],
    disabled: Colors.grey.A100,
  },
  background: '#fff',
}

export default ColorStyle;