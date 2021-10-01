import { Link, TableCell } from '@mui/material';
import { buildInaraLink } from 'functions/buildInaraLink';
import { IFleetCarrier } from 'models/about/fleetCarrier';

export const CarrierTableRow = ({ carrier }: { carrier: IFleetCarrier }) => {
  return (
    <>
      <TableCell>{carrier.name}</TableCell>
      <TableCell>
        <Link href={buildInaraLink('fleetcarrier', carrier.id)} target="_blank">
          {carrier.id}
        </Link>
      </TableCell>
      <TableCell>{carrier.owner}</TableCell>
    </>
  );
};
