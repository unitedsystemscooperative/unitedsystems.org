import { Ranks } from '~/information/components/ranks/ranks';
import Head from 'next/head';

const RanksPage = () => {
  return (
    <>
      <Head>
        <title>USC | Elite Ranks</title>
        <meta name="description" content="Pilot's Federation Ranks in Elite Dangerous" />
      </Head>
      <Ranks />
    </>
  );
};

export default RanksPage;
