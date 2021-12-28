import { PaperP1 } from '@/components/_common';
import { useLinks } from '@/hooks/useLinks';
import { Box, Container, Link, Typography } from '@mui/material';

export const Merch = () => {
  const { merch } = useLinks();
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
      <Typography variant="h3">USC Merch Store</Typography>
      <PaperP1>
        <Typography>Click the image or link below to open the merch store.</Typography>
        <a href={merch} target="_blank" rel="noreferrer" data-testid="img-link">
          <Box
            component="img"
            sx={{ width: '100%' }}
            src="/img/expansion.png"
            alt="expansion image"
          />
        </a>
        <Link href={merch} target="_blank" data-testid="straight-link">
          Go to the Merch Store
        </Link>
      </PaperP1>
    </Container>
  );
};
