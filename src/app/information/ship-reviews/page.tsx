import { ShipReviews } from '@/information/_components/shipReviews';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'USC | Ship Reviews',
  description: 'Ship Reviews compiled by USC',
};

/** Displays the ship Review Table */
const ShipReviewsPage = () => {
  return (
    <>
      <ShipReviews />
    </>
  );
};

export default ShipReviewsPage;
