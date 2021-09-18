import { AboutAllies } from 'components/about';
import { AboutLayout } from 'components/layouts';
import Head from 'next/head';

const AlliesPage = () => {
  return (
    <>
      <Head>
        <title>United Systems Cooperative Allies</title>
        <meta name="description" content="USC Ally List" />
      </Head>
      <AboutLayout>
        <AboutAllies />
      </AboutLayout>
    </>
  );
};

export default AlliesPage;
