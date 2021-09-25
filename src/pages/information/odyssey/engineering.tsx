import { OdysseyEngineering } from 'components/information/odyssey/engineering';
import { PrimaryLayout } from 'components/layouts';
import Head from 'next/head';

const OdyEngPage = () => {
  return (
    <>
      <Head>
        <title>USC | Odyssey Engineering</title>
        <meta
          name="description"
          content="What's different in Odyssey for Engineering?"
        />
      </Head>
      <PrimaryLayout>
        <OdysseyEngineering />
      </PrimaryLayout>
    </>
  );
};

export default OdyEngPage;
