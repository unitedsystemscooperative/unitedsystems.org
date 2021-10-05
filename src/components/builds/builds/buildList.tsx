import { PaperP2 } from 'components/_common/paper';
import { CenteredTypography } from 'components/_common/typography';
import { IBuildInfov2 } from 'models/builds';
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
          return <BuildCard key={(ship._id as unknown) as string} shipBuild={ship} />;
        })
      ) : (
        <PaperP2>
          <CenteredTypography>No builds found for the selected query.</CenteredTypography>
        </PaperP2>
      )}
    </div>
  );
};
