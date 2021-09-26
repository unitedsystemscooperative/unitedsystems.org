import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { IFleetCarrier } from 'models/about/fleetCarrier';
import { CarrierTableRow } from './carrierTableRow';

/**
 * Displays Personal carriers
 * @param props carriers to display
 */
export const PersonalCarriers = (props: {
  carriers: IFleetCarrier[] | undefined;
}) => {
  const { carriers } = props;

  return (
    <TableContainer
      component={Paper}
      sx={{ textAlign: 'center', margin: 'auto' }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Owner</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {carriers?.map((carrier) => (
            <TableRow key={carrier.id}>
              <CarrierTableRow carrier={carrier} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
