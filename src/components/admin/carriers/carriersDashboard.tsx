import {
  Button,
  Container,
  Fade,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { EDSpinner } from '@admiralfeb/react-components';
import { useFleetCarriers } from 'hooks/about/useFleetCarriers';
import React, { useState } from 'react';
import { IFleetCarrier } from 'models/about/fleetCarrier';
import { useSnackbar } from 'notistack';
import { Add, Delete, Edit } from '@material-ui/icons';
import { CarrierTableRow } from 'components/about/carriers/carrierTableRow';
import { CarrierDialog } from './carriersDialog';

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
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-end',
      flexWrap: 'wrap',
    },
  },
}));

const DashBoardTitleBar = ({ addFC }: { addFC: () => void }) => {
  const classes = useTitleBarStyles();
  return (
    <Toolbar className={classes.root}>
      <Typography variant="h4" component="div" className={classes.title}>
        USC Fleet Carrier Admin
      </Typography>
      <Tooltip title="Add a carrier" arrow>
        <Button variant="contained" color="primary" onClick={addFC}>
          <Add />
        </Button>
      </Tooltip>
    </Toolbar>
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
  iconButton: {
    marginLeft: theme.spacing(1),
  },
}));

/** Displays Fleet Carrier Information */
export const CarriersDashboard = () => {
  const classes = useStyles();
  const { fleetCarriers, isLoading } = useFleetCarriers();

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogValues, setDialogValues] = useState<IFleetCarrier | undefined>(
    undefined
  );
  const { addCarrier, updateCarrier, deleteCarrier } = useFleetCarriers();
  const { enqueueSnackbar } = useSnackbar();

  const handleOpenDialog = (carrier?: IFleetCarrier) => {
    setDialogValues(carrier);
    setOpenDialog(true);
  };

  const handleDialogClose = async (carrier?: IFleetCarrier) => {
    setOpenDialog(false);
    if (carrier) {
      console.log(carrier);

      try {
        // If _id exists, then it is an update to the existing system.
        if (carrier._id) {
          await updateCarrier(carrier);
        } else {
          await addCarrier(carrier);
        }
      } catch (e) {
        enqueueSnackbar(
          `Failed to add or update carrier. Reason: ${e.message}`,
          {
            variant: 'error',
          }
        );
      }
    }
  };

  const handleDelete = async (carrier: IFleetCarrier) => {
    try {
      await deleteCarrier(carrier);
    } catch (e) {
      enqueueSnackbar(`Failed to delete carrier. Reason: ${e.message}`, {
        variant: 'error',
      });
    }
  };

  return (
    <>
      <Fade in={isLoading}>{isLoading ? <EDSpinner /> : <div></div>}</Fade>
      <Fade in={!isLoading}>
        <Container component={Paper} maxWidth="md" className={classes.paper}>
          <DashBoardTitleBar addFC={handleOpenDialog} />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Purpose</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Admin</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fleetCarriers?.map((carrier) => (
                  <TableRow key={carrier.id}>
                    <TableCell>{carrier.purpose}</TableCell>
                    <CarrierTableRow carrier={carrier} />
                    <TableCell>
                      <IconButton
                        edge="end"
                        className={classes.iconButton}
                        onClick={() => handleOpenDialog(carrier)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        edge="end"
                        className={classes.iconButton}
                        onClick={() => handleDelete(carrier)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <CarrierDialog
            values={dialogValues}
            open={openDialog}
            onClose={handleDialogClose}
          />
        </Container>
      </Fade>
    </>
  );
};
