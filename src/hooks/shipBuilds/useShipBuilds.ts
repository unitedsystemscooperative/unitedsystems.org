import { useQuery } from '@apollo/client';
import { IBuildInfov2 } from 'models/shipBuilds';
import { useShipBuildMutations } from './useShipBuildMutations';
import { IBuildInfoInsert } from 'models/shipBuilds/buildInfoInsert';
import { QueryAllShipBuilds } from 'gql/queries/shipBuilds';

export const useShipBuilds = () => {
  const addRelated = useAddRelatedBuild();
  const addVariant = useAddVariantBuild();
  const { shipBuilds, loading, error } = useAllShipBuilds();
  const { addBuild, replaceBuild } = useShipBuildMutations();
  return {
    loading,
    shipBuilds,
    error,
    addBuild,
    addRelated,
    addVariant,
    replaceBuild,
  };
};

export const useAllShipBuilds = () => {
  const { data, loading, error } = useQuery<{
    shipBuildsv2s: IBuildInfov2[];
  }>(QueryAllShipBuilds);
  const shipBuilds = data?.shipBuildsv2s ?? [];

  return { shipBuilds, loading, error };
};

const useAddRelatedBuild = () => {
  const { addBuild, updateRelated } = useShipBuildMutations();
  const addRelatedBuild = async (
    currentID: string,
    shipBuilds: IBuildInfov2[],
    buildtoInsert: IBuildInfoInsert
  ) => {
    const currentBuild = shipBuilds.find(
      (x) => ((x._id as unknown) as string) === currentID
    );
    if (currentBuild) {
      const relatedBuilds = currentBuild.related;

      const tempBuild = buildtoInsert;
      tempBuild.related = currentBuild.related;
      tempBuild.related = [...tempBuild.related, currentID];
      const addedBuild:
        | { insertOneShipBuildsv2: IBuildInfov2 }
        | undefined
        | null = (await addBuild(tempBuild)).data;
      console.log(addedBuild);
      if (addedBuild) {
        const buildID = (addedBuild.insertOneShipBuildsv2
          ._id as unknown) as string;
        if (buildID) {
          await updateRelated(currentID, [...relatedBuilds, buildID]);
          for (const id of relatedBuilds) {
            const build = shipBuilds.find(
              (x) => ((x._id as unknown) as string) === id
            );
            if (build) {
              const newRelated = [...build.related, buildID];
              await updateRelated((build._id as unknown) as string, newRelated);
            }
          }
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
  const { addBuild, updateVariants, updateRelated } = useShipBuildMutations();
  const addVariantBuild = async (
    parentID: string,
    shipBuilds: IBuildInfov2[],
    buildtoInsert: IBuildInfoInsert
  ) => {
    const parentBuild = shipBuilds.find(
      (x) => ((x._id as unknown) as string) === parentID
    );
    if (parentBuild) {
      const variantBuilds = parentBuild.variants;

      const tempBuild = buildtoInsert;
      tempBuild.isVariant = true;
      tempBuild.related = variantBuilds;
      const addedBuild:
        | { insertOneShipBuildsv2: IBuildInfov2 }
        | undefined
        | null = (await addBuild(tempBuild)).data;
      if (addedBuild) {
        const buildID = (addedBuild.insertOneShipBuildsv2
          ._id as unknown) as string;
        if (buildID) {
          console.log(buildID);
          await updateVariants(parentID, [...variantBuilds, buildID]);

          for (const id of variantBuilds) {
            console.log(id);
            const build = shipBuilds.find(
              (x) => ((x._id as unknown) as string) === id
            );
            if (build) {
              const newRelated = [...build.related, buildID];
              await updateRelated((build._id as unknown) as string, newRelated);
            }
          }
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
