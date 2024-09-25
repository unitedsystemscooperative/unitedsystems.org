import { Box, Container, Link, Paper, Typography } from '@mui/material';
import { Metadata } from 'next';
import Image from 'next/image';
import NextLink from 'next/link';
import errorImg from 'public/img/404.jpg';

export const metadata: Metadata = {
  title: 'United Systems Cooperative',
  description: 'not found page',
};

export default function NotFoundPage() {
  return (
    <>
      <Container maxWidth="lg" sx={{ textAlign: 'center', marginTop: 1 }}>
        <Paper>
          <Typography variant="h3">Mistakes were made</Typography>
          <Typography variant="subtitle1">
            You were hyperdicted... escape destruction by going{' '}
            <NextLink href="/home" passHref legacyBehavior>
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
}
