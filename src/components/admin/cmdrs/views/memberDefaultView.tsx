import { Checkbox, IconButton, TableCell } from '@material-ui/core';
import { Link } from '@material-ui/icons';
import { IMember } from 'models/admin/cmdr';
import { PlatformString } from 'models/admin/platforms';
import { RankString } from 'models/admin/ranks';
import { RegionString } from 'models/admin/regions';
import React from 'react';
import { CmdrCells, handleDate, HeadCell } from './commonView';

export const MemberDefaultHeadCells: HeadCell<IMember>[] = [
  {
    id: 'cmdrName',
    numeric: false,
    disablePadding: false,
    label: 'CMDR Name',
  },
  {
    id: 'discordName',
    numeric: false,
    disablePadding: true,
    label: 'Discord',
  },
  { id: 'joinDate', numeric: false, disablePadding: true, label: 'Join Date' },
  {
    id: 'discordJoinDate',
    numeric: false,
    disablePadding: true,
    label: 'Discord Join Date',
  },
  { id: 'platform', numeric: false, disablePadding: true, label: 'Platform' },
  { id: 'rank', numeric: false, disablePadding: true, label: 'Rank' },
  {
    id: 'promotion',
    numeric: false,
    disablePadding: true,
    label: 'Rank Promotion',
  },
  {
    id: 'isInInaraSquad',
    numeric: false,
    disablePadding: true,
    label: 'Inara Squad',
  },
  { id: 'region', numeric: false, disablePadding: true, label: 'Region' },
  {
    id: 'entersVoice',
    numeric: false,
    disablePadding: true,
    label: 'Enters Voice',
  },
  {
    id: 'inaraLink',
    numeric: false,
    disablePadding: true,
    label: 'Inara Link',
  },
];

export const MemberDefaultRow = ({
  cmdr,
  isItemSelected,
}: CmdrCells<IMember>) => {
  return (
    <>
      <TableCell padding="checkbox">
        <Checkbox checked={isItemSelected} />
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        {cmdr.cmdrName.toUpperCase()}
      </TableCell>
      <TableCell>{cmdr.discordName}</TableCell>
      <TableCell>{handleDate(cmdr.joinDate)}</TableCell>
      <TableCell>{handleDate(cmdr.discordJoinDate)}</TableCell>
      <TableCell>{PlatformString[cmdr.platform]}</TableCell>
      <TableCell>{RankString[cmdr.rank]}</TableCell>
      <TableCell title="Promotion">
        {!isNaN(cmdr.promotion) && cmdr.promotion > -1
          ? RankString[cmdr.promotion]
          : ''}
      </TableCell>
      <TableCell>
        <Checkbox checked={cmdr.isInInaraSquad} disabled />
      </TableCell>
      <TableCell>{RegionString[cmdr.region]}</TableCell>
      <TableCell>
        <Checkbox checked={cmdr.entersVoice} disabled />
      </TableCell>
      <TableCell>
        {cmdr.inaraLink && (
          <IconButton
            href={cmdr.inaraLink}
            color="primary"
            size="small"
            target="_blank"
          >
            <Link />
          </IconButton>
        )}
      </TableCell>
    </>
  );
};
