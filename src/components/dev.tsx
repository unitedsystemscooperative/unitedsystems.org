import { UnderConstruction } from '@admiralfeb/react-components';
import { Container, Paper, Typography } from '@mui/material';

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
