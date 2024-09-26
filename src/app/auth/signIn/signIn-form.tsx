'use client';
import { signIn } from '@/auth';
import { LockOutlined } from '@mui/icons-material';
import { Container, Paper, Avatar, Box, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';

export function SignInForm() {
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
