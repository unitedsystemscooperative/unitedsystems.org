import { InformationMain } from 'components/information/informationMain';
import { PrimaryLayout } from 'components/layouts/primary';
import Head from 'next/head';

/** Information Landing Component */
const InformationPage = () => {
  return (
    <>
      <Head>
        <title>USC Information Archive</title>
        <meta name="description" content="USC Information Archive" />
      </Head>
      <PrimaryLayout>
        <InformationMain />
      </PrimaryLayout>
    </>
  );
};

export default InformationPage;
