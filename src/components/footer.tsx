import { Container, Link, makeStyles, Typography } from '@material-ui/core';
import NextLink from 'next/link';

function ImgCopyright() {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      style={{ textAlign: 'center' }}
    >
      Thank you to CMDR RaZ uryel for the background image
    </Typography>
  );
}
function Copyright() {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      style={{ textAlign: 'center' }}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://unitedsystems.org/">
        United Systems Cooperative
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function SiteMap() {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      style={{ textAlign: 'center' }}
    >
      <NextLink href="/home" passHref>
        <Link>Home</Link>
      </NextLink>{' '}
      |{' '}
      <NextLink href="/about" passHref>
        <Link>About</Link>
      </NextLink>{' '}
      |{' '}
      <NextLink href="/information" passHref>
        <Link>Information</Link>
      </NextLink>{' '}
      |{' '}
      <NextLink href="/builds" passHref>
        <Link>USC Builds</Link>
      </NextLink>{' '}
      |{' '}
      <NextLink href="/massacres" passHref>
        <Link>Massacre Tracker</Link>
      </NextLink>{' '}
      |{' '}
      <NextLink href="/merch" passHref>
        <Link>Merch</Link>
      </NextLink>{' '}
      |{' '}
      <NextLink href="/admin" passHref>
        <Link>Admin</Link>
      </NextLink>{' '}
      |{' '}
      <NextLink href="/dev" passHref>
        <Link>Developer</Link>
      </NextLink>{' '}
      |{' '}
      <NextLink href="/releases" passHref>
        <Link>Release Notes</Link>
      </NextLink>
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
      <Container maxWidth="sm" className={classes.center}>
        <Copyright />
        <ImgCopyright />
        <SiteMap />
      </Container>
    </footer>
  );
};
