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
    console.log(build);
    const data = await axios.post<IBuildInfov2[]>('/api/builds', build);
    console.log(data.data[0]);
    mutate('/api/builds');
    return data.data;
  };
  return addShipBuild;
};

const useUpdateBuild = () => {
  const updateBuild = async (id: string, updateDoc: unknown) => {
    await axios.put('/api/builds', { id, updateDoc });
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
