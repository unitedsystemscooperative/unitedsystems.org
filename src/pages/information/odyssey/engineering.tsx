import { PrimaryLayout } from 'components/layouts';
import Head from 'next/head';
import { OdysseyEngineering } from 'components/information/odyssey/engineering';

const OdyEng = () => {
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

export default OdyEng;
