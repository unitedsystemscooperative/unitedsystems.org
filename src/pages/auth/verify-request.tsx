import { Container, Paper, Typography } from '@mui/material';

const VerifyRequestPage = () => {
  return (
    <Container maxWidth="xs">
      <Paper
        sx={{
          marginTop: 8,
          padding: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Check your email for a 'magic' link to sign in.
        </Typography>
      </Paper>
    </Container>
  );
};

export default VerifyRequestPage;
