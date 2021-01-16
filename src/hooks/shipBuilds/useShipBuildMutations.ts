import { useMutation } from '@apollo/client';
import { IBuildInfoInsert } from 'models/shipBuilds/buildInfoInsert';
import { InsertShipBuild } from 'gql/mutations/shipBuild.insert';
import { ReplaceShipBuild } from 'gql/mutations/shipBuild.replace';
import { UpdateRelatedShipBuilds } from 'gql/mutations/shipBuild.update';

export const useShipBuildMutations = () => {
  return {
    addBuild: useAddBuild(),
    replaceBuild: useReplaceBuild(),
    updateVariants: useUpdateVariantBuilds(),
    updateRelated: useUpdateRelatedBuilds(),
  };
};

const useAddBuild = () => {
  const [addBuildMutation] = useMutation<{
    insertOneShipBuildsv2: IBuildInfoInsert;
  }>(InsertShipBuild);

  const addShipBuild = async (build: IBuildInfoInsert) => {
    const addedBuild = await addBuildMutation({
      variables: {
        build: {
          ...build,
        },
      },
    });
    return addedBuild;
  };

  return addShipBuild;
};

const useUpdateRelatedBuilds = () => {
  const [updateBuildMutation] = useMutation(UpdateRelatedShipBuilds);

  const updateRelatedBuilds = async (id: string, relatedBuilds: string[]) => {
    const updatedBuild = await updateBuildMutation({
      variables: {
        build: {
          _id: id,
        },
        input: {
          related: relatedBuilds,
        },
      },
    });
    return updatedBuild;
  };
  return updateRelatedBuilds;
};

const useUpdateVariantBuilds = () => {
  const [updateBuildMutation] = useMutation(UpdateRelatedShipBuilds);

  const updateVariantBuilds = async (id: string, variantBuilds: string[]) => {
    const updatedBuild = await updateBuildMutation({
      variables: {
        build: {
          _id: id,
        },
        input: {
          variants: variantBuilds,
        },
      },
    });
    return updatedBuild;
  };
  return updateVariantBuilds;
};

const useReplaceBuild = () => {
  const [replaceBuildMutation] = useMutation<IBuildInfoInsert>(
    ReplaceShipBuild
  );

  const replaceShipBuild = async (build: IBuildInfoInsert) => {
    const updatedBuild = await replaceBuildMutation({
      variables: {
        buildID: build._id,
        build: {
          ...build,
        },
      },
    });
    return updatedBuild;
  };

  return replaceShipBuild;
};
