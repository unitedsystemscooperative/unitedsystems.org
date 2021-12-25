import { OdysseyDeath } from '@@/information/components/odyssey/death';
import Head from 'next/head';

const OdyDeathPage = () => {
  return (
    <>
      <Head>
        <title>USC | Odyssey Death</title>
        <meta name="description" content="What happens on player death in Odyssey?" />
      </Head>
      <OdysseyDeath />
    </>
  );
};

export default OdyDeathPage;
