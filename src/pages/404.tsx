import { Box, Container, Link, Paper, Typography } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import NextLink from 'next/link';
import errorImg from 'public/img/404.jpg';

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>United Systems Cooperative</title>
        <meta
          name="description"
          content="Web site of the United Systems Cooperative"
        />
      </Head>
      <Container maxWidth="lg" sx={{ textAlign: 'center', marginTop: 1 }}>
        <Paper>
          <Typography variant="h3">Mistakes were made</Typography>
          <Typography variant="subtitle1">
            You were hyperdicted... escape destruction by going{' '}
            <NextLink href="/home" passHref>
              <Link>home</Link>
            </NextLink>
            .
          </Typography>
          <Box
            component={Image}
            sx={{ maxWidth: '100%', height: 'auto' }}
            alt="404 Error"
            src={errorImg}
          />
        </Paper>
      </Container>
    </>
  );
};

export default NotFoundPage;
