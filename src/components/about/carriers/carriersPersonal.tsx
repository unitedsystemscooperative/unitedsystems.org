import {
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  makeStyles,
} from '@material-ui/core';
import { IFleetCarrier } from 'models/about/fleetCarrier';
import { CarrierTableRow } from './carrierTableRow';

const useStyles = makeStyles({
  table: {
    maxWidth: 600,
    textAlign: 'center',
    margin: 'auto',
  },
});

/**
 * Displays Personal carriers
 * @param props carriers to display
 */
export const PersonalCarriers = (props: {
  carriers: IFleetCarrier[] | undefined;
}) => {
  const classes = useStyles();
  const { carriers } = props;

  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Owner</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {carriers?.map((carrier) => (
            <TableRow key={carrier.id}>
              <CarrierTableRow carrier={carrier} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
