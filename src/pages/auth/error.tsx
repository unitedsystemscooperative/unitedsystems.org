import { Container, Paper, Typography } from '@mui/material';
import { PrimaryLayout } from 'components/layouts';

const AuthError = () => {
  return (
    <PrimaryLayout>
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
    </PrimaryLayout>
  );
};

export default AuthError;
