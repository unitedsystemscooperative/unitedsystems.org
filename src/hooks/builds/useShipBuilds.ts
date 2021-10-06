import axios from 'axios';
import { IBuildInfov2 } from 'models/builds';
import useSWR, { mutate } from 'swr';

const API_PATH = '/api/builds';

export const useShipBuilds = () => {
  const addRelated = useAddRelatedBuild();
  const addVariant = useAddVariantBuild();
  const { shipBuilds, loading, error } = useGetShipBuilds();
  return {
    loading,
    shipBuilds,
    error,
    addBuild,
    addRelated,
    addVariant,
    updateBuild,
    deleteBuild,
  };
};

export const useGetShipBuilds = () => {
  const { data, error } = useSWR(API_PATH, (url: string) => axios.get<IBuildInfov2[]>(url));
  const shipBuilds =
    data?.data.map((x) => {
      x.variantOf = x.variantOf ?? '';
      return x;
    }) ?? [];

  return { shipBuilds, loading: !error && !data, error };
};

const addBuild = async (build: IBuildInfov2) => {
  const data = await axios.post<IBuildInfov2[]>(API_PATH, build);
  mutate(API_PATH);
  return data.data;
};
const updateBuild = async (build: Partial<IBuildInfov2>) => {
  await axios.put(API_PATH, build);
  mutate(API_PATH);
};
const deleteBuild = async (id: string, authorId?: string) => {
  if (authorId) await axios.delete(`${API_PATH}?id=${id}&authorId=${authorId}`);
  else await axios.delete(`${API_PATH}?id=${id}`);
  mutate(API_PATH);
};

const useAddRelatedBuild = () => {
  const addRelatedBuild = async (currentID: string, shipBuilds: IBuildInfov2[], buildtoInsert: IBuildInfov2) => {
    const currentBuild = shipBuilds.find((x) => x._id === currentID);
    if (currentBuild) {
      const relatedBuilds = currentBuild.related;

      const tempBuild = buildtoInsert;
      tempBuild.related = currentBuild.related;
      tempBuild.related = [...tempBuild.related, currentID];
      const addedBuild: IBuildInfov2 | undefined | null = (await addBuild(tempBuild))[0];
      if (addedBuild) {
        const buildID = addedBuild._id;
        if (buildID) {
          await updateBuild({
            _id: currentID,
            related: [...relatedBuilds, buildID.toString()],
          });
          for (const id of relatedBuilds) {
            const build = shipBuilds.find((x) => x._id === id);
            if (build) {
              const newRelated = [...build.related, buildID.toString()];
              await updateBuild({ _id: build._id, related: newRelated });
            }
          }
          mutate(API_PATH);
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
  const addVariantBuild = async (parentID: string, shipBuilds: IBuildInfov2[], buildtoInsert: IBuildInfov2) => {
    const parentBuild = shipBuilds.find((x) => x._id === parentID);
    if (parentBuild) {
      const variantBuilds = parentBuild.variants;

      const tempBuild = buildtoInsert;
      tempBuild.isVariant = true;
      tempBuild.related = variantBuilds;
      const addedBuild: IBuildInfov2 | undefined | null = (await addBuild(tempBuild))[0];
      if (addedBuild) {
        const buildID = addedBuild._id;
        if (buildID) {
          await updateBuild({
            _id: parentID,
            variants: [...variantBuilds, buildID.toString()],
          });

          for (const id of variantBuilds) {
            const build = shipBuilds.find((x) => x._id === id);
            if (build) {
              const newRelated = [...build.related, buildID.toString()];
              await updateBuild({ _id: build._id, related: newRelated });
            }
          }
          mutate(API_PATH);
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
