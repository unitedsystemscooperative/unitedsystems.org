import { UnderConstruction } from '@/app/_components/_common/under-Construction';
import { Container, Typography, Paper } from '@mui/material';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'USC | Dev Info',
  description: 'Developer information of UnitedSystems.org',
};

export default function DevPage() {
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
}
