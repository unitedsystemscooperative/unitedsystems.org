import { Container, makeStyles, Paper, Typography } from '@material-ui/core';
import { Voter } from './voter';

const useStyles = makeStyles((_) => ({
  title: {
    textAlign: 'center',
  },
}));

const voters = ['voter', 'voter1', 'voter2'];
export const VoteDashboard = () => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h3" className={classes.title}>
        Vote Dashboard
      </Typography>
      <Container maxWidth="sm" component={Paper}>
        {voters.map((voter) => (
          <Voter key={voter} />
        ))}
      </Container>
    </>
  );
};
