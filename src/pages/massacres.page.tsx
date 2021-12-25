import { MassacreKillTracker } from '@@/massacre/components/massacreKillTracker';
import Head from 'next/head';

const MassacrePage = () => {
  return (
    <>
      <Head>
        <title>USC Massacre Mission Tracker</title>
        <meta name="description" content="USC Massacre Mission Tracker" />
      </Head>
      <MassacreKillTracker />
    </>
  );
};

export default MassacrePage;
