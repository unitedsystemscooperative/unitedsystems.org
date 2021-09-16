import { Container, Paper, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { PrimaryLayout } from 'components/layouts';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const AuthError = () => {
  const classes = useStyles();

  return (
    <PrimaryLayout>
      <Container maxWidth="xs">
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign In Failed
          </Typography>
        </Paper>
      </Container>
    </PrimaryLayout>
  );
};

export default AuthError;
