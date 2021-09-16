import { Container, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { hc } from 'data/about';

const useStyles = makeStyles({
  root: {},
  header: {
    textAlign: 'center',
  },
  rank: {
    margin: 'auto',
    maxWidth: 450,
  },
});

/** Displays High Command Members */
export const AboutHC = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" className={classes.header}>
        High Command
      </Typography>
      <Paper className={classes.rank}>
        <List>
          {hc.map((rule: string, i: number) => (
            <ListItem key={i}>
              <ListItemText primary={`${rule}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};
