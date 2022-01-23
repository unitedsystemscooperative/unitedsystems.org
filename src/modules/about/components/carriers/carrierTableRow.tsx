import { buildInaraLink } from '@admiralfeb/ed-calculations/dist/functions';
import { IFleetCarrier } from '~/about/models/fleetCarrier';
import { Link, TableCell } from '@mui/material';

export const CarrierTableRow = ({ carrier }: { carrier: IFleetCarrier }) => {
  return (
    <>
      <TableCell>{carrier.name}</TableCell>
      <TableCell>
        <Link
          href={buildInaraLink({ searchType: 'fleetcarrier', value: carrier.id })}
          target="_blank">
          {carrier.id}
        </Link>
      </TableCell>
      <TableCell>{carrier.owner}</TableCell>
    </>
  );
};
