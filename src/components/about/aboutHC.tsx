import {
  Container,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { hc } from 'data/about';

const useStyles = makeStyles({
  root: {},
  header: {
    textAlign: 'center',
  },
  rank: {
    margin: 'auto',
    width: 450,
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
