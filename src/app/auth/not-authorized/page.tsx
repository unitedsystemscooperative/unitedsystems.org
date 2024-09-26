import { Box, Container, Link, Paper, Typography } from '@mui/material';
import Image from 'next/image';
import NextLink from 'next/link';
import notFoundImg from 'public/img/404.jpg';

export default function NotAuthorizedPage() {
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center', marginTop: 1 }}>
      <Paper>
        <Typography variant="h3">Not Authorized</Typography>
        <Typography variant="subtitle1">
          You were hyperdicted by the auth patrol... escape destruction by going{' '}
          <NextLink href="/home" passHref>
            <Link>home</Link>
          </NextLink>
          .
        </Typography>
        <Box
          sx={{ maxWidth: '100%', height: 'auto' }}
          component={Image}
          alt="404 Error"
          src={notFoundImg}
        />
      </Paper>
    </Container>
  );
}
