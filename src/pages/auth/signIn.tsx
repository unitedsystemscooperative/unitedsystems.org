import { Avatar, Button, Container, Paper, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { LockOutlined } from '@mui/icons-material';
import { PrimaryLayout } from 'components/layouts';
import { useForm } from 'react-hook-form';
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
import { GetServerSideProps } from 'next';
import { getSession, signIn } from 'next-auth/client';

const SignIn = () => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm<{ email: string }>();

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
