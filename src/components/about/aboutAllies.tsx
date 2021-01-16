import {
  Container,
  Fade,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { allies } from 'data/about';

const useStyles = makeStyles({
  header: {
    textAlign: 'center',
  },
  allies: {
    margin: 'auto',
    width: 450,
  },
});

/** Displays Allies */
export const AboutAllies = () => {
  const classes = useStyles();
  return (
    <Fade in={true}>
      <Container maxWidth="sm">
        <Typography variant="h4" className={classes.header}>
          Allies
        </Typography>
        <Paper className={classes.allies}>
          <List>
            {allies.map((rule: string, i: number) => (
              <ListItem key={i}>
                <ListItemText primary={`${rule}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </Fade>
  );
};
