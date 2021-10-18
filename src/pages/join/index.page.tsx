import { Join } from 'components/join/join';
import Head from 'next/head';

const JoinRequestPage = () => {
  return (
    <>
      <Head>
        <title>Join USC!</title>
        <meta name="description" content="Join the USC! We have cookies!" />
      </Head>
      <Join />
    </>
  );
};

export default JoinRequestPage;
