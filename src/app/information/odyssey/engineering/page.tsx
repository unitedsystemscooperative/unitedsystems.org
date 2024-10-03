import { OdysseyEngineering } from '@/information/_components/odyssey/engineering';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'USC | Odyssey Engineering',
  description: "What's different in Odyssey for Engineering?",
};

const OdyEngPage = () => {
  return (
    <>
      <OdysseyEngineering />
    </>
  );
};

export default OdyEngPage;
