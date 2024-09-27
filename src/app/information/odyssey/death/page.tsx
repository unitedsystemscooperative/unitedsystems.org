import { OdysseyDeath } from '@/app/information/_components/odyssey/death';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'USC | Odyssey Death',
  description: 'What happens on player death in Odyssey?',
};

const OdyDeathPage = () => {
  return (
    <>
      <OdysseyDeath />
    </>
  );
};

export default OdyDeathPage;
