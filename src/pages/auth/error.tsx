import { Container, Paper, Typography } from '@mui/material';

const AuthErrorPage = () => {
  return (
    <Container maxWidth="xs">
      <Paper
        sx={{
          marginTop: 8,
          padding: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In Failed
        </Typography>
      </Paper>
    </Container>
  );
};

export default AuthErrorPage;
