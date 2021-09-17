import { UnderConstruction } from '@admiralfeb/react-components';
import { Container, Paper, Typography, useTheme } from '@mui/material';

export const DevComponent = () => {
  const theme = useTheme();
  return (
    <Container maxWidth="md">
      <Typography variant="h3" sx={{ textAlign: 'center' }}>
        Developer Info
      </Typography>
      <Paper sx={{ padding: theme.spacing(1) }}>
        <UnderConstruction />
      </Paper>
    </Container>
  );
};
