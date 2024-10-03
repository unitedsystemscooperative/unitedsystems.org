import { InformationMain } from '@/information/_components/informationMain';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'USC Information Archive',
  description: 'USC Information Archive',
};

/** Information Landing Component */
const InformationPage = () => {
  return (
    <>
      <InformationMain />
    </>
  );
};

export default InformationPage;
