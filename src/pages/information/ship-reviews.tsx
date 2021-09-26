import { ShipReviews } from 'components/information/shipReviews';
import Head from 'next/head';

/** Displays the ship Review Table */
const ShipReviewsPage = () => {
  return (
    <>
      <Head>
        <title>USC Ship Reviews</title>
        <meta name="description" content="Ship Reviews compiled by USC" />
      </Head>
      <ShipReviews />
    </>
  );
};

export default ShipReviewsPage;
