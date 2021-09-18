import { OdysseyDeath } from 'components/information/odyssey/death';
import { PrimaryLayout } from 'components/layouts';
import Head from 'next/head';

const OdyDeath = () => {
  return (
    <>
      <Head>
        <title>USC | Odyssey Death</title>
        <meta
          name="description"
          content="What happens on player death in Odyssey?"
        />
      </Head>
      <PrimaryLayout>
        <OdysseyDeath />
      </PrimaryLayout>
    </>
  );
};

export default OdyDeath;
