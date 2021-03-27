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
import { useSystems } from 'hooks/about/useSystems';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

const useStyles = makeStyles(() => ({
  textCenter: {
    textAlign: 'center',
  },
  paper: {
    margin: 'auto',
    width: 450,
  },
}));

export const AboutSystems = () => {
  const classes = useStyles();
  const { loading, factionSystems, error } = useSystems();
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
            <List subheader={<ListSubheader>Controlled Systems</ListSubheader>}>
              {factionSystems &&
                factionSystems
                  .filter((system) => system.isControlled === true)
                  .map((system) => (
                    <ListItem
                      button
                      key={system.name}
                      component={Link}
                      href={system.inaraLink}
                      target="_blank"
                    >
                      <ListItemText primary={system.name} />
                    </ListItem>
                  ))}
            </List>
            <List subheader={<ListSubheader>Present In Systems</ListSubheader>}>
              {factionSystems &&
                factionSystems
                  .filter((system) => system.isControlled === false)
                  .map((system) => (
                    <ListItem
                      button
                      key={system.name}
                      component={Link}
                      href={system.inaraLink}
                      target="_blank"
                    >
                      <ListItemText primary={system.name} />
                    </ListItem>
                  ))}
            </List>
          </List>
        </Paper>
      </Container>
    </Fade>
  );
};
