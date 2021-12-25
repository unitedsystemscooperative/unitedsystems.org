import { BGSInfo } from '@@/information/components/bgs';
import Head from 'next/head';

const BGSPage = () => {
  return (
    <>
      <Head>
        <title>BGS General Info</title>
        <meta name="description" content="Background Information (BGS) General Information" />
      </Head>
      <BGSInfo />
    </>
  );
};

export default BGSPage;
