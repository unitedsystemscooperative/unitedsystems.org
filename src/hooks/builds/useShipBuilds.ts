import { IBuildInfov2 } from 'models/builds';
import { useShipBuildMutations } from './useShipBuildMutations';
import { IBuildInfoInsert } from 'models/builds/buildInfoInsert';
import useSWR, { mutate } from 'swr';
import axios from 'axios';

export const useShipBuilds = () => {
  const addRelated = useAddRelatedBuild();
  const addVariant = useAddVariantBuild();
  const { shipBuilds, loading, error } = useAllShipBuilds();
  const { addBuild } = useShipBuildMutations();
  return {
    loading,
    shipBuilds,
    error,
    addBuild,
    addRelated,
    addVariant,
  };
};

export const useAllShipBuilds = () => {
  const { data, error } = useSWR('/api/builds', (url: string) =>
    axios.get(url)
  );
  const shipBuilds = data?.data ?? [];

  return { shipBuilds, loading: !error && !data, error };
};

const useAddRelatedBuild = () => {
  const { addBuild, updateBuild } = useShipBuildMutations();
  const addRelatedBuild = async (
    currentID: string,
    shipBuilds: IBuildInfov2[],
    buildtoInsert: IBuildInfoInsert
  ) => {
    const currentBuild = shipBuilds.find((x) => x._id === currentID);
    if (currentBuild) {
      const relatedBuilds = currentBuild.related;

      const tempBuild = buildtoInsert;
      tempBuild.related = currentBuild.related;
      tempBuild.related = [...tempBuild.related, currentID];
      const addedBuild: IBuildInfov2 | undefined | null = (
        await addBuild(tempBuild)
      )[0];
      console.log(addedBuild);
      if (addedBuild) {
        const buildID = addedBuild._id;
        if (buildID) {
          await updateBuild(currentID, {
            related: [...relatedBuilds, buildID],
          });
          for (const id of relatedBuilds) {
            const build = shipBuilds.find((x) => x._id === id);
            if (build) {
              const newRelated = [...build.related, buildID];
              await updateBuild(build._id, {
                related: newRelated,
              });
            }
          }
          mutate('/api/shipBuilds');
        }
      } else {
        throw new Error('Reference build and related builds not updated');
      }
    } else {
      throw new Error('Reference build cannot be found');
    }
  };
  return addRelatedBuild;
};

const useAddVariantBuild = () => {
  const { addBuild, updateBuild } = useShipBuildMutations();
  const addVariantBuild = async (
    parentID: string,
    shipBuilds: IBuildInfov2[],
    buildtoInsert: IBuildInfoInsert
  ) => {
    const parentBuild = shipBuilds.find((x) => x._id === parentID);
    if (parentBuild) {
      const variantBuilds = parentBuild.variants;

      const tempBuild = buildtoInsert;
      tempBuild.isVariant = true;
      tempBuild.related = variantBuilds;
      const addedBuild: IBuildInfov2 | undefined | null = (
        await addBuild(tempBuild)
      )[0];
      console.log(addedBuild);
      if (addedBuild) {
        const buildID = addedBuild._id;
        if (buildID) {
          console.log(buildID);
          await updateBuild(parentID, {
            variants: [...variantBuilds, buildID],
          });

          for (const id of variantBuilds) {
            console.log(id);
            const build = shipBuilds.find((x) => x._id === id);
            if (build) {
              const newRelated = [...build.related, buildID];
              await updateBuild(build._id, {
                related: newRelated,
              });
            }
          }
          mutate('/api/shipBuilds');
        }
      } else {
        throw new Error('Parent and related builds were not updated');
      }
    } else {
      throw new Error('Parent cannot be found');
    }
  };
  return addVariantBuild;
};
