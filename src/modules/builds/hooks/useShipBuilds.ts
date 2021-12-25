import { IBuildInfov2 } from '~/builds/models';
import axios from 'axios';
import useSWR from 'swr';

const API_PATH = '/api/builds';

export const useShipBuilds = (init?: IBuildInfov2[]) => {
  const {
    data: shipBuilds,
    error,
    mutate,
  } = useSWR(
    API_PATH,
    (url: string) => axios.get<IBuildInfov2[]>(url).then((data) => data?.data ?? []),
    {
      fallbackData: init,
    }
  );

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
    loading: !error && !shipBuilds,
    shipBuilds,
    error,
    addBuild,
    updateBuild,
    deleteBuild,
  };
};
