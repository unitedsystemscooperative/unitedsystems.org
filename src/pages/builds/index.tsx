import { BuildSystem } from 'components/builds';
import { PrimaryLayout } from 'components/layouts/primary';
import Head from 'next/head';

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
