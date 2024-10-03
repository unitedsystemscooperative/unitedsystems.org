import { Ranks } from '@/information/_components/ranks/ranks';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'USC | Elite Ranks',
  description: "Pilot's Federation Ranks in Elite Dangerous",
};

const RanksPage = () => {
  return (
    <>
      <Ranks />
    </>
  );
};

export default RanksPage;
