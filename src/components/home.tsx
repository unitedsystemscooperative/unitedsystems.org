import { Box, Container, Paper, Typography, useTheme } from '@mui/material';
// import { useDownloadLink } from 'hooks/useDownloadLink';
import { latin, latinTranslation, lore } from 'data/home';
import React from 'react';

export const Home = () => {
  const theme = useTheme();
  // const { getDownloadLink } = useDownloadLink();
  return (
    <Container maxWidth="lg">
      <Typography component="h1" variant="h3" sx={{ textAlign: 'center' }}>
        United Systems Cooperative
      </Typography>
      <Paper sx={{ textAlign: 'center', padding: theme.spacing(1) }}>
        <Typography sx={{ marginBottom: theme.spacing(1) }}>{lore}</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            border: '1px solid white',
            borderRadius: 3,
            width: 350,
            margin: 'auto',
            [theme.breakpoints.down('md')]: {
              width: '100%',
            },
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Cinzel, serif',
              fontSize: 32,
              [theme.breakpoints.down('md')]: {
                fontSize: 24,
              },
            }}
            variant="h4"
          >
            {latin}
          </Typography>
          <Typography variant="subtitle2" sx={{ flex: '0 0' }}>
            {latinTranslation}
          </Typography>
        </Box>
        <Box
          component="img"
          sx={{
            width: '100%',
            padding: 0,
            objectFit: 'scale-down',
            maxHeight: 700,
          }}
          src="/uscLogo.png"
        />
      </Paper>
    </Container>
  );
};
