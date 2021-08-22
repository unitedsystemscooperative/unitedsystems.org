import { mutate } from 'swr';
import { IBuildInfoInsert } from 'models/builds/buildInfoInsert';
import axios from 'axios';
import { IBuildInfov2 } from 'models/builds';

export const useShipBuildMutations = () => {
  return {
    addBuild: useAddBuild(),
    updateBuild: useUpdateBuild(),
  };
};

const useAddBuild = () => {
  const addShipBuild = async (build: IBuildInfoInsert) => {
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
