import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  Avatar,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { useContext } from 'react';
import { RealmAppContext } from 'providers';
import { useForm } from 'react-hook-form';
import { NavLink, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { LoginProviders } from 'models/loginProviders';

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
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface ICredentials {
  email: string;
  password: string;
}

export const Login = () => {
  const classes = useStyles();
  const realm = useContext(RealmAppContext);
  const { register, handleSubmit, reset } = useForm<ICredentials>();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const onSubmit = async (data: ICredentials) => {
    const { email, password } = data;
    if (realm) {
      try {
        await realm.logInEmail(email, password);
      } catch (err) {
        if ((err.message as string).includes('invalid username/password')) {
          enqueueSnackbar('Invalid email or password', { variant: 'error' });
        } else {
          enqueueSnackbar('Login failed', { variant: 'error' });
        }
        console.error(err);
        reset();
      }
    }
  };

  if (realm && realm.currentUser) {
    if (realm.checkUserProvider(LoginProviders.userpass)) {
      history.push('/loginComplete');
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            inputRef={register({ required: true })}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
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
          <Grid container>
            <Grid item xs>
              <Link variant="body2" component={NavLink} to="/resetPassword">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
