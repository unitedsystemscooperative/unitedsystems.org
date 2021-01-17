import { EDSpinner } from '@admiralfeb/react-components';
import {
  Container,
  Fade,
  Link,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { useFactionSystems } from 'hooks/about/useFactionSystems';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  textCenter: {
    textAlign: 'center',
  },
  paper: {
    margin: 'auto',
    width: 450,
  },
}));

export const AboutFaction = () => {
  const classes = useStyles();
  const { loading, factionSystems, error } = useFactionSystems();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) {
      enqueueSnackbar('Failed to retrieve faction Systems. ' + error.message, {
        variant: 'error',
      });
    }
  }, [error, enqueueSnackbar]);

  if (loading) {
    return <EDSpinner />;
  }

  return (
    <Fade in={true}>
      <Container maxWidth="sm">
        <Typography variant="h3" className={classes.textCenter}>
          Faction Information
        </Typography>
        <Paper className={classes.paper}>
          <List>
            <ListItem
              button
              component={Link}
              href="https://inara.cz/galaxy-minorfaction/78085/"
              target="_blank"
            >
              <ListItemText primary="United Systems Cooperative - Minor Faction" />
            </ListItem>
            <List subheader={<ListSubheader>Faction Systems</ListSubheader>}>
              {factionSystems &&
                factionSystems.map((info) => (
                  <ListItem
                    button
                    key={info.text}
                    component={Link}
                    href={info.link}
                    target="_blank"
                  >
                    <ListItemText primary={info.text} />
                  </ListItem>
                ))}
            </List>
          </List>
        </Paper>
      </Container>
    </Fade>
  );
};
