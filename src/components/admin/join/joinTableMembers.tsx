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
import { FileCopy } from '@material-ui/icons';
import { copytoClipboard } from 'functions/copytoClipboard';
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
              <TableCell>Timezone</TableCell>
            </TableRow>
          </TableHead>
          {members && (
            <TableBody>
              {members
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((map) => (
                  <TableRow key={`${map.discord} ${map.timeStamp}`}>
                    <TableCell>{map.timeStamp}</TableCell>
                    <TableCell>
                      <div>
                        {map.cmdr}{' '}
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
                        {map.discord}{' '}
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
        count={members.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
