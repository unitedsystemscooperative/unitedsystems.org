'use client';
import { TitleBarwAdd } from '@/app/_components/_common';
import { IAlly } from '@/app/about/_models/ally';
import { Delete, Edit } from '@mui/icons-material';
import { Container, IconButton, List, ListItem, ListItemText, Paper } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { AllyDialog } from './allyDialog';

type AllyDashboardProps = {
  allies?: IAlly[];
  addAllyAction: (ally: IAlly) => Promise<void>;
  updateAllyAction: (ally: IAlly) => Promise<void>;
  deleteAllyAction: (ally: IAlly) => Promise<void>;
};

export const AllyDashboard = ({
  allies,
  addAllyAction,
  updateAllyAction,
  deleteAllyAction,
}: AllyDashboardProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogValues, setDialogValues] = useState<IAlly | undefined>(undefined);
  const { enqueueSnackbar } = useSnackbar();

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
          await updateAllyAction(ally);
        } else {
          await addAllyAction(ally);
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
      await deleteAllyAction(ally);
    } catch (e) {
      enqueueSnackbar(`Failed to delete system. Reason: ${e.message}`, {
        variant: 'error',
      });
    }
  };

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
          {allies?.map((ally, i: number) => (
            <ListItem
              key={i}
              secondaryAction={
                <>
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
                </>
              }>
              <ListItemText primary={`${ally.name}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <AllyDialog values={dialogValues} open={openDialog} onClose={handleDialogClose} />
    </Container>
  );
};
