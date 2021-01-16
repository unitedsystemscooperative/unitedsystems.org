import {
  Typography,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Fade,
  Container,
} from '@material-ui/core';
import { discordRules, memberRules } from 'data/about';

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: 'center',
  },
  root: {
    display: 'grid',
    gridTemplateColumns: '0.5fr 1fr',
    gridTemplateRows: 'auto',
    width: '90%',
    margin: 'auto',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'auto',
    },
  },
  rules: {
    border: '3px solid white',
    borderRadius: 10,
    margin: 5,
  },
  consequences: {
    gridColumn: '1 / 3',
    border: '3px solid white',
    borderRadius: 10,
    margin: 5,
    padding: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      gridColumn: 1,
    },
  },
  listItem: {
    margin: `0 ${theme.spacing(2)} 0 ${theme.spacing(1)}`,
  },
}));

/** Displays the rules */
export const AboutRules = () => {
  const classes = useStyles();
  return (
    <Fade in={true}>
      <Container maxWidth="lg" className={classes.header}>
        <Typography variant="h4">Rules</Typography>
        <Paper className={classes.root}>
          <div className={classes.rules}>
            <Typography variant="h5">Discord</Typography>
            <List>
              {discordRules.map((rule: string, index: number) => (
                <ListItem key={index} className={classes.listItem}>
                  <ListItemText primary={`${index + 1}) ${rule}`} />
                </ListItem>
              ))}
            </List>
          </div>
          <div className={classes.rules}>
            <Typography variant="h5">Members of USC</Typography>
            <List>
              {memberRules.map((rule: string, index: number) => (
                <ListItem key={index} className={classes.listItem}>
                  <ListItemText primary={`${index + 1}) ${rule}`} />
                </ListItem>
              ))}
            </List>
          </div>
          <div className={classes.consequences}>
            <Typography>
              Those found in violation of any of these Discord or Group rules,
              or found attempting to bypass these rules in any way, will first
              be subject to a minimum of a warning, further offences will be
              subject to demotion, expulsion, and/or USC Kill-on-Sight status.
            </Typography>
          </div>
        </Paper>
      </Container>
    </Fade>
  );
};
