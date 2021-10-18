import { BuildDetail } from 'components/builds/builds/buildDetail';
import Head from 'next/head';

const BuildDetailPage = () => {
  return (
    <>
      <Head>
        <title>USC Build</title>
        <meta name="description" content="USC Build Detail" />
      </Head>
      <BuildDetail />
    </>
  );
};

export default BuildDetailPage;
