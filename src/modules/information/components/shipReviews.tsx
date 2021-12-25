import { useShipReviews } from '@@/information/hooks/useShipReviews';
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

export const ShipReviews = () => {
  const shipReviews = useShipReviews();
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
      <Typography variant="h3">Ship Reviews</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ textAlign: 'center' }}>
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
                    variant="outlined"
                    color="secondary">
                    Pilot Review
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
