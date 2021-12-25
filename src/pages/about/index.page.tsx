import { AboutLayout } from '@@/about/layouts/about';
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
