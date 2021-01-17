import { mutate } from 'swr';
import { IBuildInfoInsert } from 'models/builds/buildInfoInsert';
import { InsertShipBuild } from 'gql/mutations/shipBuild.insert';
import { ReplaceShipBuild } from 'gql/mutations/shipBuild.replace';
import { UpdateRelatedShipBuilds } from 'gql/mutations/shipBuild.update';
import { gqlFetcher } from 'gql/fetcher';
import { useContext } from 'react';
import { RealmAppContext } from 'providers';
import { IBuildInfov2 } from 'models/builds';

export const useShipBuildMutations = () => {
  return {
    addBuild: useAddBuild(),
    replaceBuild: useReplaceBuild(),
    updateVariants: useUpdateVariantBuilds(),
    updateRelated: useUpdateRelatedBuilds(),
  };
};

const useAddBuild = () => {
  const realm = useContext(RealmAppContext);

  const addShipBuild = async (build: IBuildInfoInsert) => {
    const fetchRes = await gqlFetcher(
      InsertShipBuild,
      {
        build: {
          ...build,
        },
      },
      realm
    );
    console.log(fetchRes);
    const newBuild: IBuildInfov2 = fetchRes.insertOneShipBuildsv2;
    mutate('/api/shipBuilds', async (builds: IBuildInfov2[]) => [
      ...builds,
      newBuild,
    ]);
    return { data: newBuild };
  };

  return addShipBuild;
};

const useUpdateRelatedBuilds = () => {
  const realm = useContext(RealmAppContext);

  const updateRelatedBuilds = async (id: string, relatedBuilds: string[]) => {
    const updatedBuild = await gqlFetcher(
      UpdateRelatedShipBuilds,
      {
        variables: {
          build: {
            _id: id,
          },
          input: {
            related: relatedBuilds,
          },
        },
      },
      realm
    );
    return updatedBuild;
  };
  return updateRelatedBuilds;
};

const useUpdateVariantBuilds = () => {
  const realm = useContext(RealmAppContext);

  const updateVariantBuilds = async (id: string, variantBuilds: string[]) => {
    const updatedBuild = await gqlFetcher(
      UpdateRelatedShipBuilds,
      {
        variables: {
          build: {
            _id: id,
          },
          input: {
            variants: variantBuilds,
          },
        },
      },
      realm
    );
    return updatedBuild;
  };
  return updateVariantBuilds;
};

const useReplaceBuild = () => {
  const realm = useContext(RealmAppContext);

  const replaceShipBuild = async (build: IBuildInfoInsert) => {
    const updatedBuild = await gqlFetcher(
      ReplaceShipBuild,
      {
        buildID: build._id,
        build: {
          ...build,
        },
      },
      realm
    );
    return updatedBuild;
  };

  return replaceShipBuild;
};
