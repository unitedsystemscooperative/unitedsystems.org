import { useArrayData } from '@/hooks/useArrayData';
import { IBuildInfov2 } from '~/builds/models';

const API_PATH = '/api/builds';

export const useShipBuilds = (init?: IBuildInfov2[]) => {
  const {
    data: shipBuilds,
    error,
    addItem: addBuild,
    updateItem: updateBuild,
    deleteItemCustom,
  } = useArrayData(API_PATH, init);

  const deleteBuild = async (id: string, authorId?: string) => {
    const params = new URLSearchParams();
    params.append('id', id);

    if (authorId) params.append('authorId', authorId);

    await deleteItemCustom(params);
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
