import { CopyButton } from '@/components/_common';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { PlatformString, ReferralString, RegionString } from '~/admin/models';
import { IJoinRequest } from '~/join/models/joinRequest';

export const GuestsTable = ({ guests }: { guests: IJoinRequest[] }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>TimeStamp</TableCell>
              <TableCell>CMDR</TableCell>
              <TableCell>Discord</TableCell>
              <TableCell>Platform</TableCell>
              <TableCell>Referral</TableCell>
              <TableCell>Referral2</TableCell>
              <TableCell>Region</TableCell>
            </TableRow>
          </TableHead>
          {guests && (
            <TableBody>
              {guests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((map) => (
                <TableRow key={`${map.discord} ${map.timeStamp}`}>
                  <TableCell>{map.timeStamp}</TableCell>
                  <TableCell>
                    {map.cmdr} <CopyButton value={map.cmdr.toUpperCase()} />
                  </TableCell>
                  <TableCell>
                    {map.discord} <CopyButton value={map.discord} />
                  </TableCell>
                  <TableCell>{PlatformString[map.platform]}</TableCell>
                  <TableCell>{ReferralString[map.referral]}</TableCell>
                  <TableCell>{map.referral2}</TableCell>
                  <TableCell>{map.region ? RegionString[map.region] : map.timezone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={guests.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
