import {
  Container,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { useLinks } from 'hooks/useLinks';
import React from 'react';
import LinkIcon from '@material-ui/icons/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  header: {
    textAlign: 'center',
  },
  paper: {
    padding: theme.spacing(2),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
export const JoinNextSteps = () => {
  const classes = useStyles();
  const { inaraSquadLink, discordLink } = useLinks();
  return (
    <Container className={classes.root}>
      <Typography variant="h4" className={classes.header}>
        Next Steps
      </Typography>
      <Paper className={classes.paper}>
        <List>
          <ListItem>
            <ListItemText primary={'Join our Discord'} />
            <ListItemSecondaryAction>
              <IconButton edge="end" href={discordLink} target="_blank">
                <LinkIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <List
            component="div"
            disablePadding
            subheader={
              <ListSubheader component="div">Recommended</ListSubheader>
            }
          >
            <ListItem className={classes.nested}>
              <ListItemText
                primary={`Find us in-game! (UCPC for PC | UCXB for Xbox | UCPS for PlayStation)`}
              />
            </ListItem>
            <ListItem className={classes.nested}>
              <ListItemText primary={'Join our Inara Squadron'} />
              <ListItemSecondaryAction>
                <IconButton edge="end" href={inaraSquadLink} target="_blank">
                  <LinkIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </List>
      </Paper>
    </Container>
  );
};
