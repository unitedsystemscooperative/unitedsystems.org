import { Avatar, Button, Container, Paper, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { LockOutlined } from '@mui/icons-material';
import { PrimaryLayout } from 'components/layouts';
import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import qs from 'query-string';
import { redirects } from 'data/redirects';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    textAlign: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const [session] = useSession();
  const router = useRouter();
  const { register, handleSubmit } = useForm<{ email: string }>();

  useEffect(() => {
    if (session) {
      const params = qs.parseUrl(router.asPath);
      const redirectKey = params.query.redirect as string;
      const redirectPath = redirects.find((x) => x.key === redirectKey)?.path;
      if (redirectPath) {
        router.push(redirectPath);
      }
    }
  }, [router, session]);

  const onSubmit = async (data: { email: string }) => {
    const { email } = data;

    await signIn('email', { email });
  };

  return (
    <PrimaryLayout>
      <Container maxWidth="xs">
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          {session ? (
            <></>
          ) : (
            <>
              <form
                className={classes.form}
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
                  className={classes.submit}
                >
                  Sign In
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </PrimaryLayout>
  );
};

export default SignIn;
