import { MerchStore } from '@/data/links';
import { Box, Container, Paper, Typography } from '@mui/material';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'USC Merch',
  description: 'USC Merch Store',
};

export default function MerchPage() {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
      <Typography variant="h3">USC Merch Store</Typography>
      <Paper sx={{ p: 1 }}>
        <Typography>Click the image or link below to open the merch store.</Typography>
        <a href={MerchStore} target="_blank" rel="noreferrer">
          <Box
            component="img"
            sx={{ width: '100%' }}
            src="/img/expansion.png"
            alt="expansion image"
          />
        </a>
        <Link href={MerchStore} target="_blank">
          Go to the Merch Store
        </Link>
      </Paper>
    </Container>
  );
}
