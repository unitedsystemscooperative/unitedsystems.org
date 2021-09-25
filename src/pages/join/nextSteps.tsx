import { JoinNextSteps } from 'components/join';
import { PrimaryLayout } from 'components/layouts';
import Head from 'next/head';

export const JoinNextStepsPage = () => {
  return (
    <>
      <Head>
        <title>Next Steps after Joining USC</title>
      </Head>
      <PrimaryLayout>
        <JoinNextSteps />
      </PrimaryLayout>
    </>
  );
};

export default JoinNextStepsPage;
