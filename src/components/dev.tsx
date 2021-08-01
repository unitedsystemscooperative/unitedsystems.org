import { UnderConstruction } from '@admiralfeb/react-components';
import { Container, makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  center: {
    textAlign: 'center',
  },
  paper: {
    padding: theme.spacing(1),
  },
  img: {
    width: '100%',
  },
}));

export const DevComponent = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Typography variant="h3" className={classes.center}>
        Developer Info
      </Typography>
      <Paper className={classes.paper}>
        <UnderConstruction />
      </Paper>
    </Container>
  );
};
