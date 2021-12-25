import { Home } from '@/components';
import Head from 'next/head';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>United Systems Cooperative</title>
        <meta name="description" content="Web site of the United Systems Cooperative" />
      </Head>
      <Home />
    </>
  );
};

export default HomePage;
