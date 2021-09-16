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
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Add, Delete, Edit } from '@mui/icons-material';
import { useSystems } from 'hooks/about/useSystems';
import { System } from 'models/about/system';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { SystemDialog } from './systemDialog';

const useTitleBarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    '& button': {
      margin: theme.spacing(1),
    },
  },
  title: {
    flex: '2 1 100%',
    textAlign: 'left',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'flex-end',
      flexWrap: 'wrap',
    },
  },
}));

const DashboardTitleBar = ({ addSystem }: { addSystem: () => void }) => {
  const classes = useTitleBarStyles();
  return (
    <Toolbar className={classes.root}>
      <Typography variant="h4" component="div" className={classes.title}>
        System Management
      </Typography>
      <Tooltip title="Add a System" arrow>
        <Button variant="contained" color="primary" onClick={addSystem}>
          <Add />
        </Button>
      </Tooltip>
    </Toolbar>
  );
};

const useSystemListStyles = makeStyles((theme) => ({
  iconButton: {
    marginLeft: theme.spacing(1),
  },
}));

const SystemList = ({
  title,
  systems,
  editSystem,
  deleteSystem,
}: {
  title: string;
  systems: System[];
  editSystem: (system: System) => void;
  deleteSystem: (system: System) => void;
}) => {
  const classes = useSystemListStyles();
  return (
    <List
      subheader={
        <ListSubheader>
          {title} - {systems.length}
        </ListSubheader>
      }
    >
      {systems.map((system) => (
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
              onClick={() => editSystem(system)}
              size="large">
              <Edit />
            </IconButton>
            <IconButton
              edge="end"
              className={classes.iconButton}
              onClick={() => deleteSystem(system)}
              size="large">
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

const useStyles = makeStyles((theme) => ({
  header: {
    textAlign: 'center',
  },
  paper: {
    textAlign: 'center',
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
      <Paper className={classes.paper}>
        <DashboardTitleBar addSystem={handleOpenDialog} />
        <List>
          <ListItem
            button
            component={Link}
            href="https://inara.cz/galaxy-minorfaction/78085/"
            target="_blank"
          >
            <ListItemText primary="United Systems Cooperative - Minor Faction" />
          </ListItem>
          {factionSystems && (
            <>
              <SystemList
                title="Controlled Systems"
                systems={factionSystems.filter(
                  (system) => system.isControlled === true
                )}
                editSystem={handleOpenDialog}
                deleteSystem={handleDelete}
              />
              <SystemList
                title="Present In Systems"
                systems={factionSystems.filter(
                  (system) => system.isControlled === false
                )}
                editSystem={handleOpenDialog}
                deleteSystem={handleDelete}
              />
            </>
          )}
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
