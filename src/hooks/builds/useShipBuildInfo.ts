import { getShipInfofromID } from 'functions/builds';
import { useMemo } from 'react';
import { useShipBuilds } from './useShipBuilds';

/**
 * Returns the build and ship info for a build provided the id.
 * It also provides the ship builds and loading boolean.
 * @param id id of build
 */
export const useShipBuildInfo = (id?: string) => {
  const { loading, shipBuilds } = useShipBuilds();

  const foundBuild = useMemo(() => {
    if (id === undefined) {
      return undefined;
    }
    if (loading) {
      return undefined;
    }

    const build = shipBuilds.find(
      (x) => x._id && ((x._id as unknown) as string) === id
    );
    if (build) {
      return build;
    } else {
      return null;
    }
  }, [id, loading, shipBuilds]);

  const shipInfo = useMemo(() => {
    if (foundBuild) {
      return getShipInfofromID(foundBuild.shipId);
    } else {
      return undefined;
    }
  }, [foundBuild]);

  return { loading, shipBuilds, foundBuild, shipInfo };
};
