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
import { IJoinInfo } from 'models/join/joinInfo';
import { ChangeEvent, useState } from 'react';
import { buildPlatforms } from './buildPlatforms';

export const AmbassadorsTable = ({
  ambassadors,
}: {
  ambassadors: IJoinInfo[];
}) => {
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
              <TableCell>Group</TableCell>
              <TableCell>Need Private</TableCell>
              <TableCell>Timezone</TableCell>
            </TableRow>
          </TableHead>
          {ambassadors && (
            <TableBody>
              {ambassadors
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
                    <TableCell>{buildPlatforms(map.platforms)}</TableCell>
                    <TableCell>{map.group}</TableCell>
                    <TableCell>{map.needPrivate?.toString()}</TableCell>
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
        count={ambassadors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
