import { DevComponent } from 'components/dev';
import { PrimaryLayout } from 'components/layouts';
import Head from 'next/head';

const DevPage = () => {
  return (
    <>
      <Head>
        <title>USC | Dev Info</title>
        <meta
          name="description"
          content="Developer information of UnitedSystems.org"
        />
      </Head>
      <PrimaryLayout>
        <DevComponent />
      </PrimaryLayout>
    </>
  );
};

export default DevPage;
