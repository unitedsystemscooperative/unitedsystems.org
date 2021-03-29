import { AboutSystems } from 'components/about';
import { AboutLayout } from 'components/layouts';
import Head from 'next/head';

const FC = () => {
  return (
    <>
      <Head>
        <title>United Systems Cooperative Faction Information</title>
        <meta name="description" content="USC Faction Information" />
      </Head>
      <AboutLayout>
        <AboutSystems />
      </AboutLayout>
    </>
  );
};

export default FC;
