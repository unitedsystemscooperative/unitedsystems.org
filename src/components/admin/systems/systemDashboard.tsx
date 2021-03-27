import { EDSpinner } from '@admiralfeb/react-components';
import {
  Button,
  Container,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { useSystems } from 'hooks/about/useSystems';
import { System } from 'models/about/system';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { SystemDialog } from './systemDialog';

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: 'center',
  },
  paper: {
    textAlign: 'center',
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  iconButton: {
    marginLeft: theme.spacing(1),
  },
}));

export const SystemDashboard = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogValues, setDialogValues] = useState<System | undefined>(
    undefined
  );
  const {
    loading,
    factionSystems,
    error,
    addSystem,
    updateSystem,
    deleteSystem,
  } = useSystems();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) {
      enqueueSnackbar('Failed to retrieve faction Systems. ' + error.message, {
        variant: 'error',
      });
    }
  }, [error, enqueueSnackbar]);

  const handleOpenDialog = (system?: System) => {
    setDialogValues(system);
    setOpenDialog(true);
  };

  const handleDialogClose = async (system?: System) => {
    setOpenDialog(false);
    if (system) {
      console.log(system);

      try {
        // If _id exists, then it is an update to the existing system.
        if (system._id) {
          await updateSystem(system);
        } else {
          await addSystem(system);
        }
      } catch (e) {
        enqueueSnackbar(
          `Failed to add or update system. Reason: ${e.message}`,
          { variant: 'error' }
        );
      }
    }
  };

  const handleDelete = async (system: System) => {
    try {
      await deleteSystem(system);
    } catch (e) {
      enqueueSnackbar(`Failed to delete system. Reason: ${e.message}`, {
        variant: 'error',
      });
    }
  };

  if (loading) {
    return <EDSpinner />;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" className={classes.header}>
        System Management
      </Typography>
      <Paper className={classes.paper}>
        <Typography variant="h4">Faction Systems</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog()}
        >
          Add System
        </Button>
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
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        className={classes.iconButton}
                        onClick={() => handleOpenDialog(system)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        edge="end"
                        className={classes.iconButton}
                        onClick={() => handleDelete(system)}
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
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
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        className={classes.iconButton}
                        onClick={() => handleOpenDialog(system)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        edge="end"
                        className={classes.iconButton}
                        onClick={() => handleDelete(system)}
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
          </List>
        </List>
      </Paper>
      <SystemDialog
        values={dialogValues}
        open={openDialog}
        onClose={handleDialogClose}
      />
    </Container>
  );
};
