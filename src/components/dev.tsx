import { Container, Paper, Typography } from '@mui/material';
import { UnderConstruction } from './_common/under-Construction';

export const DevComponent = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" sx={{ textAlign: 'center' }}>
        Developer Info
      </Typography>
      <Paper sx={{ padding: 1 }}>
        <UnderConstruction />
      </Paper>
    </Container>
  );
};
