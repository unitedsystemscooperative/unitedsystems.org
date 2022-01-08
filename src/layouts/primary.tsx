import { Footer } from '@/layouts/components/footer';
import { Navbar } from '@/layouts/components/navbar';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

export const PrimaryLayout = ({ children, version }: { children: ReactNode; version: string }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
      <Navbar />
      <Box component="main" sx={{ mt: 0, mb: 2 }}>
        {children}
      </Box>
      <Footer version={version} />
    </Box>
  );
};
