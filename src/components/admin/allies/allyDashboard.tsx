import { EDSpinner } from '@admiralfeb/react-components';
import {
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { useAllies } from 'hooks/about/useAllies';
import { IAlly } from 'models/about/ally';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { AllyDialog } from './allyDialog';

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

export const AllyDashboard = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogValues, setDialogValues] = useState<IAlly | undefined>(
    undefined
  );
  const {
    loading,
    allies,
    error,
    addAlly,
    updateAlly,
    deleteAlly,
  } = useAllies();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) {
      enqueueSnackbar('Failed to retrieve Allies. ' + error.message, {
        variant: 'error',
      });
    }
  }, [error, enqueueSnackbar]);

  const handleOpenDialog = (ally?: IAlly) => {
    setDialogValues(ally);
    setOpenDialog(true);
  };

  const handleDialogClose = async (ally?: IAlly) => {
    setOpenDialog(false);
    if (ally) {
      console.log(ally);

      try {
        // If _id exists, then it is an update to the existing system.
        if (ally._id) {
          await updateAlly(ally);
        } else {
          await addAlly(ally);
        }
      } catch (e) {
        enqueueSnackbar(`Failed to add or update ally. Reason: ${e.message}`, {
          variant: 'error',
        });
      }
    }
  };

  const handleDelete = async (ally: IAlly) => {
    try {
      await deleteAlly(ally);
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
        Ally Management
      </Typography>
      <Paper className={classes.paper}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog()}
        >
          Add Ally
        </Button>
        <List>
          {allies.map((ally: { name: string }, i: number) => (
            <ListItem key={i}>
              <ListItemText primary={`${ally.name}`} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  className={classes.iconButton}
                  onClick={() => handleOpenDialog(ally)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  edge="end"
                  className={classes.iconButton}
                  onClick={() => handleDelete(ally)}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
      <AllyDialog
        values={dialogValues}
        open={openDialog}
        onClose={handleDialogClose}
      />
    </Container>
  );
};
