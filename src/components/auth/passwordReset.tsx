import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  Avatar,
  Button,
  Container,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { useContext } from 'react';
import { RealmAppContext } from 'providers';
import { useForm } from 'react-hook-form';
import { IRealmContext } from 'models/realmContext';
import { useUrlQuery } from 'hooks/useURLQuery';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

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

const RequestPasswordReset = (props: { realm: IRealmContext | null }) => {
  const { realm } = props;
  const classes = useStyles();
  const { register, handleSubmit } = useForm<{ email: string }>();

  const onSubmit = async (data: { email: string }) => {
    const { email } = data;
    console.log(data);
    if (realm) {
      await realm.requestPasswordReset(email);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Password Reset
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
            inputRef={register}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Request Reset
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

const CompletePasswordReset = (props: {
  realm: IRealmContext | null;
  token: string;
  tokenId: string;
}) => {
  const { realm, token, tokenId } = props;
  const classes = useStyles();
  const { register, handleSubmit } = useForm<{ password: string }>();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: { password: string }) => {
    const { password } = data;
    console.log(data);
    if (realm) {
      try {
        await realm.completePasswordReset(token, tokenId, password);
        history.push('/resetComplete');
      } catch (err) {
        if ((err.message as string).includes('token is expired or invalid')) {
          enqueueSnackbar('Token is invalid or expired', { variant: 'error' });
        } else {
          enqueueSnackbar(err.message, { variant: 'error' });
        }
        console.error(err);
        history.replace('/login');
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Password Reset
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
            label="New Password"
            name="password"
            autoComplete="password"
            type="password"
            autoFocus
            inputRef={register}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Complete Reset
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export const PasswordReset = () => {
  const realm = useContext(RealmAppContext);
  const params = useUrlQuery();

  if (params.get('token') && params.get('tokenId')) {
    const token = params.get('token');
    const tokenId = params.get('tokenId');

    return (
      <CompletePasswordReset realm={realm} token={token!} tokenId={tokenId!} />
    );
  } else {
    return <RequestPasswordReset realm={realm} />;
  }
};
