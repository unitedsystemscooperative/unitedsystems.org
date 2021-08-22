import axios from 'axios';
import { IBuildInfov2 } from 'models/builds';
import { mutate } from 'swr';

export const useShipBuildMutations = () => {
  return {
    addBuild: useAddBuild(),
    updateBuild: useUpdateBuild(),
    deleteBuild: useDeleteBuild(),
  };
};

const useAddBuild = () => {
  const addShipBuild = async (build: IBuildInfov2) => {
    const data = await axios.post<IBuildInfov2[]>('/api/builds', build);
    mutate('/api/builds');
    return data.data;
  };
  return addShipBuild;
};

const useUpdateBuild = () => {
  const updateBuild = async (build: Partial<IBuildInfov2>) => {
    await axios.put('/api/builds', build);
    mutate('/api/builds');
  };
  return updateBuild;
};

const useDeleteBuild = () => {
  const deleteBuild = async (id: string, authorId?: string) => {
    if (authorId)
      await axios.delete(`/api/builds?id=${id}&authorId=${authorId}`);
    else await axios.delete(`/api/builds?id=${id}`);
    mutate('/api/builds');
  };
  return deleteBuild;
};
