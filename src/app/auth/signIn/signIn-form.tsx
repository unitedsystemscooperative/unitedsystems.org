'use client';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Container, Paper, TextField } from '@mui/material';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

export function SignInForm() {
  const { register, handleSubmit } = useForm<{ email: string }>({
    defaultValues: { email: '' },
  });

  const onSubmit = async ({ email }: { email: string }) => {
    // await signInAction(email);
    await signIn('sendgrid', { email });
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
        }}>
        <Avatar sx={{ margin: 1, backgroundColor: 'secondary.main' }}>
          <LockOutlined />
        </Avatar>
        <Box
          component="form"
          sx={{ width: '100%', marginTop: 1, px: 1, textAlign: 'center' }}
          noValidate
          onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
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
            }}>
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
