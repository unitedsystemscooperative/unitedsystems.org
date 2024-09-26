import { getBuilds } from '../api/builds/getBuilds';
import { BuildSystem } from '@/app/builds/_components';
import Head from 'next/head';

export default async function BuildPage() {
  const builds = await getBuilds();
  return (
    <>
      <Head>
        <title>USC Build Archive</title>
        <meta name="description" content="Builds of the USC" />
      </Head>
      <BuildSystem init={builds} />
    </>
  );
}
