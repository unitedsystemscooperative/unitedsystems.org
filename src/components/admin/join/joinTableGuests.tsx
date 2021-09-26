import { FileCopy } from '@mui/icons-material';
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
} from '@mui/material';
import { copytoClipboard } from 'functions/copytoClipboard';
import { PlatformString } from 'models/admin/platforms';
import { IJoinRequest } from 'models/join/joinRequest';
import { ChangeEvent, useState } from 'react';

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
              <TableCell>Reference</TableCell>
              <TableCell>Reference2</TableCell>
              <TableCell>Timezone</TableCell>
            </TableRow>
          </TableHead>
          {guests && (
            <TableBody>
              {guests
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((map) => (
                  <TableRow key={`${map.discord} ${map.timeStamp}`}>
                    <TableCell>{map.timeStamp}</TableCell>
                    <TableCell>
                      {map.cmdr}{' '}
                      <IconButton
                        size="small"
                        color="secondary"
                        onClick={() => copytoClipboard(map.cmdr.toUpperCase())}
                      >
                        <FileCopy />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      {map.discord}{' '}
                      <IconButton
                        size="small"
                        color="secondary"
                        onClick={() => copytoClipboard(map.discord)}
                      >
                        <FileCopy />
                      </IconButton>
                    </TableCell>
                    <TableCell>{PlatformString[map.platform]}</TableCell>
                    <TableCell>{map.referral}</TableCell>
                    <TableCell>{map.referral2}</TableCell>
                    <TableCell>{map.timezone}</TableCell>
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
