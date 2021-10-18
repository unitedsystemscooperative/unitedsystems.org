import { BuildSystem } from 'components/builds';
import Head from 'next/head';

const BuildPage = () => {
  return (
    <>
      <Head>
        <title>USC Build Archive</title>
        <meta name="description" content="Builds of the USC" />
      </Head>
      <BuildSystem />
    </>
  );
};

export default BuildPage;
