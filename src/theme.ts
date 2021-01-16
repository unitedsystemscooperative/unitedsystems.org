import { createMuiTheme } from '@material-ui/core';

const euroStile = {
  fontFamily: 'Eurostile',
  fontStyle: 'normal',
  src: `url(/fonts/Eurostile-Roman.woff2) format('woff2')`,
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f07b05',
    },
    secondary: {
      main: '#00B3F7',
    },
    type: 'dark',
  },
  typography: {
    fontFamily: [
      'Eurostile',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 16,
  },
});

theme.overrides = {
  MuiCssBaseline: {
    '@global': {
      body: {
        height: '100vh',
        backgroundImage: `url("/img/usc-raz-2021-01.png")`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
      },
      '@font-face': [euroStile],
    },
  },
  MuiLink: {
    root: {
      color: theme.palette.primary.main,
    },
  },
  MuiButton: {
    root: {
      textTransform: 'initial',
    },
  },
};

export { theme };
