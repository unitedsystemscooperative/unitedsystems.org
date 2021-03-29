import { Link, TableCell } from '@material-ui/core';
import { IFleetCarrier } from 'models/about/fleetCarrier';
import React from 'react';

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
