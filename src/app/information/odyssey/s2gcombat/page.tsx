import { OdysseyS2GCombat } from '@/app/information/_components/odyssey/s2gcombat';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'USC | Odyssey Ship to Ground Combat',
  description: 'Ship to ground combat information',
};

const OdyCombatPage = () => {
  return (
    <>
      <OdysseyS2GCombat />
    </>
  );
};

export default OdyCombatPage;
