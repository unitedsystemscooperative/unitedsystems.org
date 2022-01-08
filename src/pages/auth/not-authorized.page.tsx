import { Box, Container, Link, Paper, Typography } from '@mui/material';
import Head from 'next/head';
import NextLink from 'next/link';

const NotAuthorizedPage = () => {
  return (
    <>
      <Head>
        <title>United Systems Cooperative</title>
        <meta name="description" content="Web site of the United Systems Cooperative" />
      </Head>
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
            component="img"
            sx={{ maxWidth: '100%', height: 'auto' }}
            alt="404 Error"
            src="/img/404.jpg"
          />
        </Paper>
      </Container>
    </>
  );
};

export default NotAuthorizedPage;
