import { EDSpinner } from '@admiralfeb/react-components';
import {
  Button,
  Container,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { useUsers } from 'hooks/useUsers';
import { IUser } from 'models/auth/user';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { SystemDialog } from './userDialog';

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

export const UserDashboard = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogValues, setDialogValues] = useState<IUser | undefined>(
    undefined
  );
  const { loading, users, error, addUser, updateUser, deleteUser } = useUsers();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) {
      enqueueSnackbar('Failed to retrieve users. ' + error.message, {
        variant: 'error',
      });
    }
  }, [error, enqueueSnackbar]);

  const handleOpenDialog = (user?: IUser) => {
    setDialogValues(user);
    setOpenDialog(true);
  };

  const handleDialogClose = async (user?: IUser) => {
    setOpenDialog(false);
    if (user) {
      console.log(user);

      try {
        // If _id exists, then it is an update to the existing system.
        if (user._id) {
          await updateUser(user);
        } else {
          await addUser(user);
        }
      } catch (e) {
        enqueueSnackbar(`Failed to add or update user. Reason: ${e.message}`, {
          variant: 'error',
        });
      }
    }
  };

  const handleDelete = async (user: IUser) => {
    try {
      await deleteUser(user);
    } catch (e) {
      enqueueSnackbar(`Failed to delete user. Reason: ${e.message}`, {
        variant: 'error',
      });
    }
  };

  if (loading) {
    return <EDSpinner />;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h3" className={classes.header}>
        User Management
      </Typography>
      <Paper className={classes.paper}>
        <Typography variant="h4">Users</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog()}
        >
          Add User
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>CMDR Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Member/HC</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.cmdr}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <IconButton
                      edge="end"
                      className={classes.iconButton}
                      onClick={() => handleOpenDialog(user)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      edge="end"
                      className={classes.iconButton}
                      onClick={() => handleDelete(user)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <SystemDialog
        values={dialogValues}
        open={openDialog}
        onClose={handleDialogClose}
      />
    </Container>
  );
};
