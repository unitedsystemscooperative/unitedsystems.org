import { LockOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
} from '@mui/material';
import { redirects } from 'data/redirects';
import { GetServerSideProps } from 'next';
import { getSession, signIn } from 'next-auth/client';
import { useForm } from 'react-hook-form';

const SignInPage = () => {
  const { register, handleSubmit } = useForm<{ email: string }>({
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: { email: string }) => {
    const { email } = data;

    await signIn('email', { email });
  };

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
        <Avatar sx={{ margin: 1, backgroundColor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
        <Box
          component="form"
          sx={{ width: '100%', marginTop: 1, px: 1, textAlign: 'center' }}
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
            {...register('email', { required: 'Your email is required' })}
          />
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="primary"
            sx={{
              mt: 3,
              mb: 1,
              mx: 0,
            }}
          >
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignInPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    const redirectKey = context.query.redirect as string;
    const redirectPath = redirects.find((x) => x.key === redirectKey)?.path;
    if (redirectPath) {
      return {
        redirect: { destination: redirectPath, permanent: false },
      };
    } else {
      return {
        redirect: { destination: '/home', permanent: false },
      };
    }
  }

  return { props: {} };
};
