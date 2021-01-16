import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function ImgCopyright() {
  return (
    <Typography
      variant='body2'
      color='textSecondary'
      style={{ textAlign: 'center' }}>
      Thank you to CMDR RaZ uryel for the background image
    </Typography>
  );
}
function Copyright() {
  return (
    <Typography
      variant='body2'
      color='textSecondary'
      style={{ textAlign: 'center' }}>
      {'Copyright © '}
      <Link color='inherit' href='https://unitedsystems.org/'>
        United Systems Cooperative
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
  center: {
    textAlign: 'center',
  },
}));

export const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth='sm' className={classes.center}>
        <Copyright />
        <ImgCopyright />
      </Container>
    </footer>
  );
};
