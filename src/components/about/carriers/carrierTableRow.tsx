import { Link, TableCell } from '@mui/material';
import { IFleetCarrier } from 'models/about/fleetCarrier';

export const CarrierTableRow = ({ carrier }: { carrier: IFleetCarrier }) => {
  return (
    <>
      <TableCell>{carrier.name}</TableCell>
      <TableCell>
        <Link href={carrier.inaraLink} target="_blank">
          {carrier.id}
        </Link>
      </TableCell>
      <TableCell>{carrier.owner}</TableCell>
    </>
  );
};
