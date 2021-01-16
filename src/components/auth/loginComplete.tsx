import { Container, makeStyles, Paper, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { RealmAppContext } from 'providers';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export const LoginComplete = () => {
  const classes = useStyles();
  const realm = useContext(RealmAppContext);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  if (realm && realm.checkUserProvider('local-userpass')) {
    return (
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Login Complete
          </Typography>
          <Typography></Typography>
        </Paper>
      </Container>
    );
  } else {
    history.push('/login');
    enqueueSnackbar('You are not logged in.', { variant: 'info' });
    return <></>;
  }
};
