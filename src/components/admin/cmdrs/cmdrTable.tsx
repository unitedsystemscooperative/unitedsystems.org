import {
  Button,
  Checkbox,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { ICMDR } from 'models/admin/cmdr';
import { PlatformString } from 'models/admin/platforms';
import { RankString } from 'models/admin/ranks';
import { RegionString } from 'models/admin/regions';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

interface CMDRTableProps {
  cmdrs: ICMDR[];
}

export const CMDRTable = (props: CMDRTableProps) => {
  const { cmdrs } = props;

  const classes = useStyles();

  const handleDate = (date) => {
    const newDate = new Date(date);
    return newDate > new Date('2019-01-01')
      ? newDate.toLocaleDateString('en-CA')
      : '';
  };
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>CMDR Name</TableCell>
            <TableCell>Discord</TableCell>
            <TableCell>Join Date</TableCell>
            <TableCell>Discord Join Date</TableCell>
            <TableCell>Platform</TableCell>
            <TableCell>Rank</TableCell>
            <TableCell>Rank Promotion</TableCell>
            <TableCell>Inara Squad</TableCell>
            <TableCell>Region</TableCell>
            <TableCell>Enters Voice</TableCell>
            <TableCell>Inara Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cmdrs
            .filter((cmdr) => cmdr.isDeleted !== false)
            .map((cmdr) => (
              <TableRow key={cmdr._id}>
                <TableCell>{cmdr.cmdrName.toUpperCase()}</TableCell>
                <TableCell>{cmdr.discordName}</TableCell>
                <TableCell>{handleDate(cmdr.joinDate)}</TableCell>
                <TableCell>{handleDate(cmdr.discordJoinDate)}</TableCell>
                <TableCell>{PlatformString[cmdr.platform]}</TableCell>
                <TableCell>{RankString[cmdr.rank]}</TableCell>
                <TableCell>
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
                    <Button
                      href={cmdr.inaraLink}
                      variant="contained"
                      color="primary"
                      target="_blank"
                    >
                      Link
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
