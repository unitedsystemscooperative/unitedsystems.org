import { PrimaryLayout } from 'components/layouts/primary';
import Head from 'next/head';
import { BuildSystem } from 'components/builds';

const BuildPage = () => {
  return (
    <>
      <Head>
        <title>USC Build Archive</title>
        <meta name="description" content="Builds of the USC" />
      </Head>
      <PrimaryLayout>
        <BuildSystem />
      </PrimaryLayout>
    </>
  );
};

export default BuildPage;
