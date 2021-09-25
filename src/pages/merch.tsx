import { PrimaryLayout } from 'components/layouts/primary';
import { Merch } from 'components/merch';
import Head from 'next/head';

const MerchLandingPage = () => {
  return (
    <>
      <Head>
        <title>USC Merch</title>
        <meta name="description" content="USC Merch Store" />
      </Head>
      <PrimaryLayout>
        <Merch />
      </PrimaryLayout>
    </>
  );
};

export default MerchLandingPage;
