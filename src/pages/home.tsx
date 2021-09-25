import { Home } from 'components';
import { PrimaryLayout } from 'components/layouts/primary';
import Head from 'next/head';

const HomePage = ()=> {
  return (
    <>
      <Head>
        <title>United Systems Cooperative</title>
        <meta
          name="description"
          content="Web site of the United Systems Cooperative"
        />
      </Head>
      <PrimaryLayout>
        <Home />
      </PrimaryLayout>
    </>
  );
}

export default HomePage;
