import { BuildDetail } from 'components/builds/builds/buildDetail';
import { PrimaryLayout } from 'components/layouts/primary';
import Head from 'next/head';

export const BuildDetailPage = () => {
  return (
    <>
      <Head>
        <title>USC Build</title>
        <meta name="description" content="USC Build Detail" />
      </Head>
      <PrimaryLayout>
        <BuildDetail />
      </PrimaryLayout>
    </>
  );
};

export default BuildDetailPage;
