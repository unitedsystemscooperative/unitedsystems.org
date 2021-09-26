import { EDSpinner } from '@admiralfeb/react-components';
import { Delete, Edit } from '@mui/icons-material';
import {
  Container,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Paper,
} from '@mui/material';
import { TitleBarwAdd } from 'components/_common';
import { useSystems } from 'hooks/about/useSystems';
import { System } from 'models/about/system';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { SystemDialog } from './systemDialog';

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
              sx={{ ml: 1 }}
              onClick={() => editSystem(system)}
              size="large"
            >
              <Edit />
            </IconButton>
            <IconButton
              edge="end"
              sx={{ ml: 1 }}
              onClick={() => deleteSystem(system)}
              size="large"
            >
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export const SystemDashboard = () => {
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
      <Paper sx={{ p: 1, my: 1, textAlign: 'center' }}>
        <TitleBarwAdd
          title="System Management"
          addTip="Add a system"
          addItem={handleOpenDialog}
        />
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
