import { EDSpinner } from '@admiralfeb/react-components';
import { filterShipBuilds } from 'functions/builds/filterShipBuilds';
import { useShipBuilds } from 'hooks/builds/useShipBuilds';
import { IBuildInfov2, IQuery } from 'models/builds';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { BuildCard } from './buildCard';

export const BuildList = (props: { buildQuery: IQuery | undefined }) => {
  const [queriedBuilds, setQueriedBuilds] = useState<IBuildInfov2[]>();
  const { buildQuery } = props;
  const { loading, shipBuilds, error } = useShipBuilds();
  const { enqueueSnackbar } = useSnackbar();

  const filterBuilds = useCallback(() => {
    if (loading || error) {
      return;
    }
    const filtered = filterShipBuilds(shipBuilds, buildQuery);
    setQueriedBuilds(filtered);
  }, [loading, shipBuilds, buildQuery, error]);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (error) {
      enqueueSnackbar(`Failed to retrieve builds. ${error.message}`, {
        variant: 'error',
      });
    }
    filterBuilds();
  }, [loading, filterBuilds, error, enqueueSnackbar]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {loading ? (
        <EDSpinner />
      ) : (
        queriedBuilds?.map((ship) => {
          return (
            <BuildCard key={(ship._id as unknown) as string} shipBuild={ship} />
          );
        })
      )}
    </div>
  );
};
