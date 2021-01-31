import { Paper, Table, TableContainer } from '@material-ui/core';

export const TableWrapper = (props) => (
  <TableContainer component={Paper}>
    <Table {...props} />
  </TableContainer>
);
