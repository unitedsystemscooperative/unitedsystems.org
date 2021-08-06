import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import { Add, FileCopy } from '@material-ui/icons';
import { copytoClipboard } from 'functions/copytoClipboard';
import { IMember } from 'models/admin/cmdr';
import { Platform } from 'models/admin/platforms';
import { Rank } from 'models/admin/ranks';
import { Referral } from 'models/admin/referrals';
import { Region, RegionString } from 'models/admin/regions';
import { IJoinInfo } from 'models/join/joinInfo';
import React from 'react';
import { buildPlatforms } from './buildPlatforms';

export const MembersTable = ({ members }: { members: IJoinInfo[] }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const processPlatform = (platforms: {
    pc: boolean;
    xbox: boolean;
    ps: boolean;
  }): Platform => {
    if (platforms.pc) {
      return Platform.PC;
    }
    if (platforms.xbox) {
      return Platform.Xbox;
    }
    if (platforms.ps) {
      return Platform.PS;
    }
    return Platform.PC;
  };

  const handleAddMember = (joinInfo: IJoinInfo) => {
    const newMember: IMember = {
      cmdrName: joinInfo.cmdr.toUpperCase(),
      discordName: joinInfo.discord,
      discordJoinDate: null,
      joinDate: null,
      platform: processPlatform(joinInfo.platforms),
      rank: Rank.Cadet,
      region: joinInfo.region ?? Region.N_CAmerica,
      ref1: joinInfo.reference,
      ref2: joinInfo.reference2,
      entersVoice: false,
      isInInaraSquad: false,
    };
  };

  const processLength = (length: string) => {
    switch (length) {
      case 'lessthanMonth':
        return '< 1 Month';
      case 'morethanMonth':
        return '> 1 Month';
      case 'morethan6Month':
        return '> 6 Months';
      case 'morethan1Year':
        return '> 1 Year';
      default:
        return '';
    }
  };

  return (
    <Paper>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>TimeStamp</TableCell>
              <TableCell>CMDR</TableCell>
              <TableCell>Discord</TableCell>
              <TableCell>Platform</TableCell>
              <TableCell>Playing Length</TableCell>
              <TableCell>Reference</TableCell>
              <TableCell>Reference2</TableCell>
              <TableCell>Region</TableCell>
              {/* <TableCell>Add to Dashboard</TableCell> */}
            </TableRow>
          </TableHead>
          {members && (
            <TableBody>
              {members
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((map) => (
                  <TableRow key={`${map.discord} ${map.timeStamp}`}>
                    <TableCell>
                      {new Date(map.timeStamp).toUTCString()}
                    </TableCell>
                    <TableCell>
                      <div>
                        {map.cmdr}
                        <IconButton
                          size="small"
                          color="secondary"
                          onClick={() =>
                            copytoClipboard(map.cmdr.toUpperCase())
                          }
                        >
                          <FileCopy />
                        </IconButton>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        {map.discord}
                        <IconButton
                          size="small"
                          color="secondary"
                          onClick={() => copytoClipboard(map.discord)}
                        >
                          <FileCopy />
                        </IconButton>
                      </div>
                    </TableCell>
                    <TableCell>{buildPlatforms(map.platforms)}</TableCell>
                    <TableCell>{processLength(map.playingLength)}</TableCell>
                    <TableCell>{map.reference}</TableCell>
                    <TableCell>{map.reference2}</TableCell>
                    <TableCell>{map.region}</TableCell>
                    {/* <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleAddMember(map)}
                      >
                        <Add />
                      </IconButton>
                    </TableCell> */}
                  </TableRow>
                ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={members.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
