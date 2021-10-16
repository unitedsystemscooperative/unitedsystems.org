import axios from 'axios';
import { IBuildInfov2 } from 'models/builds';
import useSWR from 'swr';

const API_PATH = '/api/builds';

export const useShipBuilds = () => {
  const { data, error, mutate } = useSWR(API_PATH, (url: string) => axios.get<IBuildInfov2[]>(url));

  const shipBuilds = data?.data ?? [];

  const addBuild = async (build: IBuildInfov2) => {
    const data = await axios.post<IBuildInfov2[]>(API_PATH, build);
    mutate();
    return data.data;
  };
  const updateBuild = async (build: Partial<IBuildInfov2>) => {
    await axios.put(API_PATH, build);
    mutate();
  };
  const deleteBuild = async (id: string, authorId?: string) => {
    if (authorId) await axios.delete(`${API_PATH}?id=${id}&authorId=${authorId}`);
    else await axios.delete(`${API_PATH}?id=${id}`);
    mutate();
  };

  return {
    loading: !error && !data,
    shipBuilds,
    error,
    addBuild,
    updateBuild,
    deleteBuild,
  };
};
