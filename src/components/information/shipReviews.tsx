import {
  Button,
  Container,
  Fade,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { useShipReviews } from 'hooks/information/useShipReviews';

const useStyles = makeStyles({
  table: {
    textAlign: 'center',
  },
});

/** Displays the ship Review Table */
export const ShipReviews = () => {
  const classes = useStyles();
  const shipReviews = useShipReviews();
  return (
    <Fade in={true}>
      <Container maxWidth="sm" className={classes.table}>
        <Typography variant="h3">Ship Reviews</Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Ship</TableCell>
                <TableCell>Manufacture</TableCell>
                <TableCell>Review Link</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shipReviews.map((review) => (
                <TableRow key={review.shipId}>
                  <TableCell>{review.name}</TableCell>
                  <TableCell>{review.manufacturer}</TableCell>
                  <TableCell>
                    <Button
                      href={review.shipReview}
                      target="_blank"
                      variant="contained"
                      color="secondary"
                    >
                      Pilot Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Fade>
  );
};
