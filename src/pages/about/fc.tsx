import { Carriers } from 'components/about';
import { AboutLayout } from 'components/layouts';
import Head from 'next/head';

const FleetCarriersPage = () => {
  return (
    <>
      <Head>
        <title>United Systems Cooperative Fleet Carriers</title>
        <meta name="description" content="USC Fleet Carrier List" />
      </Head>
      <AboutLayout>
        <Carriers />
      </AboutLayout>
    </>
  );
};

export default FleetCarriersPage;
