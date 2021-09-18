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
import { PrimaryLayout } from 'components/layouts/primary';
import { useShipReviews } from 'hooks/information/useShipReviews';
import Head from 'next/head';

/** Displays the ship Review Table */
const ShipReviews = () => {
  const shipReviews = useShipReviews();
  return (
    <>
      <Head>
        <title>USC Ship Reviews</title>
        <meta name="description" content="Ship Reviews compiled by USC" />
      </Head>
      <PrimaryLayout>
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
      </PrimaryLayout>
    </>
  );
};

export default ShipReviews;
