import { EDSpinner } from '@admiralfeb/react-components';
import { Container, Fade, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useAllies } from 'hooks/about/useAllies';

const useStyles = makeStyles({
  header: {
    textAlign: 'center',
  },
  allies: {
    margin: 'auto',
    maxWidth: 450,
  },
});

/** Displays Allies */
export const AboutAllies = () => {
  const classes = useStyles();
  const { allies, loading } = useAllies();
  return (
    <Fade in={true}>
      <Container maxWidth="sm">
        <Typography variant="h4" className={classes.header}>
          Allies
        </Typography>
        {loading ? (
          <EDSpinner />
        ) : (
          <Paper className={classes.allies}>
            <List>
              {allies.map((ally: { name: string }, i: number) => (
                <ListItem key={i}>
                  <ListItemText primary={`${ally.name}`} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </Container>
    </Fade>
  );
};
