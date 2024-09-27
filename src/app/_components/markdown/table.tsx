import { Paper, Table, TableContainer } from '@mui/material';

export const TableWrapper = (props) => (
  <TableContainer component={Paper}>
    <Table {...props} />
  </TableContainer>
);
