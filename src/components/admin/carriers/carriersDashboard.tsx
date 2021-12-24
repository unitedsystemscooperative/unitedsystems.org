import { EDSpinner } from '@admiralfeb/react-components';
import { Delete, Edit } from '@mui/icons-material';
import {
  Container,
  IconButton,
  IconButtonProps,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { CarrierTableRow } from 'src/modules/about/components/carriers/carrierTableRow';
import { TitleBarwAdd } from 'components/_common';
import { useFleetCarriers } from 'hooks/about/useFleetCarriers';
import { IFleetCarrier } from 'models/about/fleetCarrier';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { CarrierDialog } from './carriersDialog';

const StyledIconButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));
const defaultIconProps: Partial<IconButtonProps> = {
  edge: 'end',
  size: 'large',
};

/** Displays Fleet Carrier Information */
export const CarriersDashboard = ({ init }: { init?: IFleetCarrier[] }) => {
  const { fleetCarriers, isLoading } = useFleetCarriers(init);

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogValues, setDialogValues] = useState<IFleetCarrier | undefined>(undefined);
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
        enqueueSnackbar(`Failed to add or update carrier. Reason: ${e.message}`, {
          variant: 'error',
        });
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

  if (isLoading) return <EDSpinner />;

  return (
    <Container
      component={Paper}
      maxWidth="md"
      sx={{
        textAlign: 'center',
        p: 1,
        my: 1,
      }}>
      <TitleBarwAdd title="Carrier Management" addTip="Add a carrier" addItem={handleOpenDialog} />
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
                  <StyledIconButton {...defaultIconProps} onClick={() => handleOpenDialog(carrier)}>
                    <Edit />
                  </StyledIconButton>
                  <StyledIconButton {...defaultIconProps} onClick={() => handleDelete(carrier)}>
                    <Delete />
                  </StyledIconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CarrierDialog values={dialogValues} open={openDialog} onClose={handleDialogClose} />
    </Container>
  );
};
