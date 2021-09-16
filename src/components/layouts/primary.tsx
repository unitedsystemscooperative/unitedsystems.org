import makeStyles from '@mui/styles/makeStyles';
import { Footer } from 'components/footer';
import { Navbar } from 'components/navbar';
import { ReactNode } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: 0,
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
  center: {
    textAlign: 'center',
  },
}));

export const PrimaryLayout = ({ children }: { children: ReactNode }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <main className={classes.main}>{children}</main>
      <Footer />
    </div>
  );
};
