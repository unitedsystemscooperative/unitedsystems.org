import { createTheme, adaptV4Theme } from '@mui/material';

const theme = createTheme(adaptV4Theme({
  palette: {
    primary: {
      main: '#f07b05',
    },
    secondary: {
      main: '#00B3F7',
    },
    type: 'dark',
  },
}));

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
