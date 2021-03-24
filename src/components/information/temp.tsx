import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

export const temp = () => {
  return (
    <Container maxWidth="sm">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Conflict Zone Level</TableCell>
            <TableCell align="center">Number Completed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center">Low</TableCell>
            <TableCell align="center">1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Medium</TableCell>
            <TableCell align="center">2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">High</TableCell>
            <TableCell align="center">3</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  );
};
