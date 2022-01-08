import { USCRules } from '~/about/components';
import { AboutLayout } from '~/about/layouts/about';
import Head from 'next/head';

const RulesPage = () => {
  return (
    <>
      <Head>
        <title>United Systems Cooperative Rules</title>
        <meta name="description" content="USC Rules List" />
      </Head>
      <AboutLayout>
        <USCRules />
      </AboutLayout>
    </>
  );
};

export default RulesPage;
