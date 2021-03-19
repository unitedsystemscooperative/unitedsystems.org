import { PrimaryLayout } from 'components/layouts/primary';
import Head from 'next/head';
import { Merch } from 'components/merch';

export default function MerchLandingPage() {
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
}
