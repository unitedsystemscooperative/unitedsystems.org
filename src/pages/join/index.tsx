import { Join } from 'components/join/join';
import { PrimaryLayout } from 'components/layouts/primary';
import Head from 'next/head';

export const JoinRequestPage = () => {
  return (
    <>
      <Head>
        <title>Join USC!</title>
        <meta name="description" content="Join the USC! We have cookies!" />
      </Head>
      <PrimaryLayout>
        <Join />
      </PrimaryLayout>
    </>
  );
};

export default JoinRequestPage;
