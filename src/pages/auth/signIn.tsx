import { LockOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
} from '@mui/material';
import { PrimaryLayout } from 'components/layouts';
import { redirects } from 'data/redirects';
import { GetServerSideProps } from 'next';
import { getSession, signIn } from 'next-auth/client';
import { useForm } from 'react-hook-form';

const SignIn = () => {
  const { register, handleSubmit } = useForm<{ email: string }>();

  const onSubmit = async (data: { email: string }) => {
    const { email } = data;

    await signIn('email', { email });
  };

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
          <Avatar sx={{ margin: 1, backgroundColor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Box
            component="form"
            sx={{ marginTop: 1, textAlign: 'center' }}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              inputRef={register({ required: true })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                marginTop: 3,
                marginBottom: 2,
                marginRight: 0,
                marginLeft: 0,
              }}
            >
              Sign In
            </Button>
          </Box>
        </Paper>
      </Container>
    </PrimaryLayout>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const redirectKey = context.query.redirect as string;
  const redirectPath = redirects.find((x) => x.key === redirectKey)?.path;

  if (redirectPath) {
    return {
      redirect: { destination: redirectPath, permanent: false },
    };
  }

  const session = await getSession(context);
  if (session) {
    return { redirect: { destination: '/home', permanent: false } };
  }

  return { props: {} };
};
