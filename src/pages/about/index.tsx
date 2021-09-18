import { AboutLayout } from 'components/layouts';
import Head from 'next/head';

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About USC</title>
        <meta name="description" content="About United Systems Cooperative" />
      </Head>
      <AboutLayout>{null}</AboutLayout>
    </>
  );
};

export default AboutPage;
