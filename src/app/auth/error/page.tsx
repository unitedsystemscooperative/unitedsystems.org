import { Container, Paper, Typography } from '@mui/material';

export default function AuthErrorPage() {
  return (
    <Container maxWidth="xs">
      <Paper
        sx={{
          marginTop: 8,
          padding: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Typography component="h1" variant="h5">
          Sign In Failed
        </Typography>
      </Paper>
    </Container>
  );
}
