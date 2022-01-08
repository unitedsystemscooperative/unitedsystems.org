import { InformationMain } from '~/information/components/informationMain';
import Head from 'next/head';

/** Information Landing Component */
const InformationPage = () => {
  return (
    <>
      <Head>
        <title>USC Information Archive</title>
        <meta name="description" content="USC Information Archive" />
      </Head>
      <InformationMain />
    </>
  );
};

export default InformationPage;
