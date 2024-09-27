import { BGSInfo } from '@/app/information/_components/bgs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BGS General Info',
  description: 'Background Information (BGS) General Information',
};

const BGSPage = () => {
  return (
    <>
      <BGSInfo />
    </>
  );
};

export default BGSPage;
