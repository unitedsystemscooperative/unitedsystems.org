import { OdysseyS2GCombat } from 'components/information/odyssey/s2gcombat';
import Head from 'next/head';

const OdyCombatPage = () => {
  return (
    <>
      <Head>
        <title>USC | Odyssey Ship to Ground Combat</title>
        <meta name="description" content="Ship to ground combat information" />
      </Head>
      <OdysseyS2GCombat />
    </>
  );
};

export default OdyCombatPage;
