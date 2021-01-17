import { AboutRules } from 'components/about';
import { AboutLayout } from 'components/layouts';
import Head from 'next/head';

const Rules = () => {
  return (
    <>
      <Head>
        <title>United Systems Cooperative Rules</title>
        <meta name='description' content='USC Rules List' />
      </Head>
      <AboutLayout>
        <AboutRules />
      </AboutLayout>
    </>
  );
};

export default Rules;
