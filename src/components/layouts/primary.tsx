import { Box, useTheme } from '@mui/material';
import { Footer } from 'components/layouts/components/footer';
import { Navbar } from './components/navbar';
import React, { ReactNode } from 'react';

export const PrimaryLayout = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Navbar />
      <Box
        component="main"
        sx={{ marginTop: 0, marginBottom: theme.spacing(2) }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};
