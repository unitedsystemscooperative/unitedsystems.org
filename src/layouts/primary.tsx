import { Footer } from '@/layouts/components/footer';
import { Navbar } from '@/layouts/components/navbar';
import { Box, useTheme } from '@mui/material';
import { ReactNode } from 'react';

export const PrimaryLayout = ({ children, version }: { children: ReactNode; version: string }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
      <Navbar />
      <Box component="main" sx={{ marginTop: 0, marginBottom: theme.spacing(2) }}>
        {children}
      </Box>
      <Footer version={version} />
    </Box>
  );
};
