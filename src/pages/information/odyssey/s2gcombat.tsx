import { PrimaryLayout } from 'components/layouts';
import Head from 'next/head';
import { OdysseyS2GCombat } from 'components/information/odyssey/s2gcombat';

const OdyCombat = () => {
  return (
    <>
      <Head>
        <title>USC | Odyssey Ship to Ground Combat</title>
        <meta name="description" content="Ship to ground combat information" />
      </Head>
      <PrimaryLayout>
        <OdysseyS2GCombat />
      </PrimaryLayout>
    </>
  );
};

export default OdyCombat;
