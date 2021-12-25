import { MiningMaps } from '@@/information/components/miningMaps';
import Head from 'next/head';

const MiningMapPage = () => {
  return (
    <>
      <Head>
        <title>USC Mining Maps</title>
        <meta name="description" content="Compiled Mining Maps" />
      </Head>
      <MiningMaps />
    </>
  );
};

export default MiningMapPage;
