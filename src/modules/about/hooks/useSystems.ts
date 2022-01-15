import { useArrayData } from '@/hooks/useArrayData';
import { System } from '~/about/models/system';

const API_PATH = '/api/systems';

export const useSystems = (initState?: System[]) => {
  const {
    data: factionSystems,
    error,
    isLoading,
    addItem: addSystem,
    updateItem: updateSystem,
    deleteItem: deleteSystem,
  } = useArrayData(API_PATH, initState);

  return {
    factionSystems,
    loading: isLoading,
    error,
    addSystem,
    updateSystem,
    deleteSystem,
  };
};
