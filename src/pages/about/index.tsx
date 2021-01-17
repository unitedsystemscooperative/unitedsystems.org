import { AboutLayout } from 'components/layouts';
import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About USC</title>
        <meta name='description' content='About United Systems Cooperative' />
      </Head>
      <AboutLayout>{null}</AboutLayout>
    </>
  );
}
