import { Box, Container, Link, Paper, Typography } from '@mui/material';
import NextLink from 'next/link';

function ImgCopyright() {
  return (
    <Typography variant="body2" color="textSecondary" style={{ textAlign: 'center' }}>
      Thank you to CMDR RaZ uryel for the background image
    </Typography>
  );
}
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" style={{ textAlign: 'center' }}>
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
    <Typography variant="body2" color="textSecondary" style={{ textAlign: 'center' }}>
      <NextLink href="/home" passHref legacyBehavior>
        <Link>Home</Link>
      </NextLink>{' '}
      |{' '}
      <NextLink href="/about" passHref legacyBehavior>
        <Link>About</Link>
      </NextLink>{' '}
      |{' '}
      <NextLink href="/information" passHref legacyBehavior>
        <Link>Information</Link>
      </NextLink>{' '}
      |{' '}
      <NextLink href="/builds" passHref legacyBehavior>
        <Link>USC Builds</Link>
      </NextLink>{' '}
      |{' '}
      <NextLink href="/massacres" passHref legacyBehavior>
        <Link>Massacre Tracker</Link>
      </NextLink>{' '}
      |{' '}
      <NextLink href="/merch" passHref legacyBehavior>
        <Link>Merch</Link>
      </NextLink>{' '}
      |{' '}
      <NextLink href="/admin" passHref legacyBehavior>
        <Link>Admin</Link>
      </NextLink>{' '}
      |{' '}
      <NextLink href="/dev" passHref legacyBehavior>
        <Link>Developer</Link>
      </NextLink>{' '}
      |{' '}
      <NextLink href="/releases" passHref legacyBehavior>
        <Link>Release Notes</Link>
      </NextLink>
    </Typography>
  );
}

export const Footer = ({ version }: { version: string }) => {
  return (
    <Box
      component="footer"
      sx={{
        marginTop: 'auto',
      }}>
      <Paper
        sx={{
          px: 2,
          py: 3,
          mr: 0,
          ml: 0,
        }}>
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <Copyright />
          <ImgCopyright />
          <SiteMap />
          <Typography variant="body2" color="textSecondary">
            Version: {version}
          </Typography>
        </Container>
      </Paper>
    </Box>
  );
};
