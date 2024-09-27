import { MiningMaps } from '@/app/information/_components/miningMaps';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BGS Mining Maps',
  description: 'Compiled Mining Maps',
};

const MiningMapPage = () => {
  return (
    <>
      <MiningMaps />
    </>
  );
};

export default MiningMapPage;
