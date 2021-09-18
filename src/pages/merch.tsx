import { PrimaryLayout } from 'components/layouts/primary';
import { Merch } from 'components/merch';
import Head from 'next/head';

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
