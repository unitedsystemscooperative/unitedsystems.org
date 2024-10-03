import { CenteredTypography, PaperP2 } from '@/_components/_common';
import { IBuildInfov2 } from '@/builds/_models';
import { BuildCard } from './buildCard';

interface BuildListProps {
  shipBuilds: IBuildInfov2[];
}

export const BuildList = ({ shipBuilds }: BuildListProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
      {shipBuilds?.length > 0 ? (
        shipBuilds?.map((ship) => {
          return <BuildCard key={ship._id as unknown as string} shipBuild={ship} />;
        })
      ) : (
        <PaperP2>
          <CenteredTypography>No builds found for the selected query.</CenteredTypography>
        </PaperP2>
      )}
    </div>
  );
};
