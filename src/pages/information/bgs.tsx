import { BGSInfo } from 'components/information/bgs';
import { PrimaryLayout } from 'components/layouts';
import Head from 'next/head';

const BGSPage = () => {
  return (
    <>
      <Head>
        <title>BGS General Info</title>
        <meta
          name="description"
          content="Background Information (BGS) General Information"
        />
      </Head>
      <PrimaryLayout>
        <BGSInfo />
      </PrimaryLayout>
    </>
  );
};

export default BGSPage;
