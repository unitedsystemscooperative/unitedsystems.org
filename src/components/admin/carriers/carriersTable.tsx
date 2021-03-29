import {
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  makeStyles,
  IconButton,
  Button,
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { CarrierTableRow } from 'components/about/carriers/carrierTableRow';
import { useFleetCarriers } from 'hooks/about/useFleetCarriers';
import { IFleetCarrier } from 'models/about/fleetCarrier';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { CarrierDialog } from './carriersDialog';

const useStyles = makeStyles((theme) => ({
  table: {
    maxWidth: 800,
    textAlign: 'center',
    margin: 'auto',
  },
  iconButton: {
    marginLeft: theme.spacing(1),
  },
}));

/**
 * Displays USC Carriers
 * @param props carriers to display
 */
export const CarriersAdmin = (props: {
  carriers: IFleetCarrier[] | undefined;
}) => {
  const classes = useStyles();
  const { carriers } = props;
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
          { variant: 'error' }
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
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog()}
      >
        Add Fleet Carrier
      </Button>{' '}
      <TableContainer component={Paper} className={classes.table}>
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
            {carriers?.map((carrier) => (
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
    </>
  );
};
