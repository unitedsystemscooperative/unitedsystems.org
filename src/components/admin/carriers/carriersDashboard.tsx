import { EDSpinner } from '@admiralfeb/react-components';
import { Delete, Edit } from '@mui/icons-material';
import {
  Container,
  Fade,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { CarrierTableRow } from 'components/about/carriers/carrierTableRow';
import { TitleBarwAdd } from 'components/_common';
import { useFleetCarriers } from 'hooks/about/useFleetCarriers';
import { IFleetCarrier } from 'models/about/fleetCarrier';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { CarrierDialog } from './carriersDialog';

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
          <TitleBarwAdd
            title="Carrier Management"
            addTip="Add a carrier"
            addItem={handleOpenDialog}
          />
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
                        size="large"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        edge="end"
                        className={classes.iconButton}
                        onClick={() => handleDelete(carrier)}
                        size="large"
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
