import { OdysseyEngineering } from '@/app/information/_components/odyssey/engineering';
import Head from 'next/head';

const OdyEngPage = () => {
  return (
    <>
      <Head>
        <title>USC | Odyssey Engineering</title>
        <meta name="description" content="What's different in Odyssey for Engineering?" />
      </Head>
      <OdysseyEngineering />
    </>
  );
};

export default OdyEngPage;
