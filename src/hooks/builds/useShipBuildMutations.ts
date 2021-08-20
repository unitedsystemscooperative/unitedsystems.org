import { mutate } from 'swr';
import axios from 'axios';
import { IBuildInfov2 } from 'models/builds';

export const useShipBuildMutations = () => {
  return {
    addBuild: useAddBuild(),
    updateBuild: useUpdateBuild(),
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateBuild = async (id: string, updateDoc: any) => {
    await axios.put('/api/builds', { id, updateDoc });
    mutate('/api/builds');
  };
  return updateBuild;
};
