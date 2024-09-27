import { Join } from '@/app/join/_components/join';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'USC | Join',
  description: 'Join the USC! We have cookies!',
};

const JoinRequestPage = () => {
  return (
    <>
      <Join />
    </>
  );
};

export default JoinRequestPage;
