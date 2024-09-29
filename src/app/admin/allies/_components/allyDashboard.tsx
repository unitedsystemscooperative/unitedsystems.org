'use client';
import { TitleBarwAdd } from '@/app/_components/_common';
import { EDSpinner } from '@/app/_components/_common/spinner';
import { useAllies } from '@/app/admin/_hooks/useAllies';
import { IAlly } from '@/app/about/_models/ally';
import { Delete, Edit } from '@mui/icons-material';
import { Container, IconButton, List, ListItem, ListItemText, Paper } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { AllyDialog } from './allyDialog';

export const AllyDashboard = ({ init }: { init?: IAlly[] }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogValues, setDialogValues] = useState<IAlly | undefined>(undefined);
  const { loading, allies, error, addAlly, updateAlly, deleteAlly } = useAllies(init);
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
      <Paper
        sx={{
          textAlign: 'center',
          padding: 1,
          marginTop: 1,
          marginBottom: 1,
        }}>
        <TitleBarwAdd title="Ally Dashboard" addTip="Add an ally" addItem={handleOpenDialog} />
        <List>
          {allies.map((ally, i: number) => (
            <ListItem key={i}>
              <ListItemText primary={`${ally.name}`} />
              <ListItem secondaryAction>
                <IconButton
                  edge="end"
                  sx={{ ml: 1 }}
                  onClick={() => handleOpenDialog(ally)}
                  size="large">
                  <Edit />
                </IconButton>
                <IconButton
                  edge="end"
                  sx={{ ml: 1 }}
                  onClick={() => handleDelete(ally)}
                  size="large">
                  <Delete />
                </IconButton>
              </ListItem>
            </ListItem>
          ))}
        </List>
      </Paper>
      <AllyDialog values={dialogValues} open={openDialog} onClose={handleDialogClose} />
    </Container>
  );
};
