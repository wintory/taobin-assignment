import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#23748B' },
    error: { main: '#A40004' },
    common: {
      white: '#FFFFFF',
      black: '#000000',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
    ].join(','),
    h2: {
      fontSize: '3.2rem',
      fontStyle: 'normal',
      fontWeight: 400,

      // [MUITheme.breakpoints.up('md')]: {
      //   fontSize: '4.8rem',
      // },
    },
    h3: {
      fontSize: '2.4rem',
      fontStyle: 'normal',
      fontWeight: 400,

      // [MUITheme.breakpoints.up('md')]: {
      //   fontSize: '4rem',
      // },
    },
    subtitle1: {
      fontSize: '1.8rem',
      fontStyle: 'normal',
      fontWeight: 400,

      // [MUITheme.breakpoints.up('md')]: {
      //   fontSize: '2.4rem',
      // },
    },
    body1: {
      fontSize: '1.4rem',
      fontStyle: 'normal',
      fontWeight: 400,

      // [MUITheme.breakpoints.up('md')]: {
      //   fontSize: '1.8rem',
      // },
    },
  },
});

export default theme;
