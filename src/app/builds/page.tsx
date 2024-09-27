import { BuildSystem } from '@/app/builds/_components';
import { Metadata } from 'next';
import { getBuilds } from '../api/builds/getBuilds';

export const metadata: Metadata = {
  title: 'USC | Build Archive',
  description: 'Builds of the USC',
};

export default async function BuildPage() {
  const builds = await getBuilds();
  return (
    <>
      <BuildSystem init={builds} />
    </>
  );
}
