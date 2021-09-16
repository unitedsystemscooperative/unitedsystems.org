import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f07b05',
    },
    secondary: {
      main: '#00B3F7',
    },
    mode: 'dark',
  },
});

theme.components = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        height: '100vh',
        backgroundImage: `url("/img/usc-raz-2021-01.png")`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
      },
    },
  },
  MuiLink: {
    styleOverrides: {
      root: {
        color: theme.palette.primary.main,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'initial',
      },
    },
  },
};

export { theme };
