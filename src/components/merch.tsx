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

export const Merch = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="sm" className={classes.center}>
      <Typography variant="h3">USC Merch Store</Typography>
      <Paper className={classes.paper}>
        <Typography variant="h4">Coming Soon!</Typography>
        <img src="/img/expansion.png" className={classes.img} />
      </Paper>
    </Container>
  );
};
