import { useData } from '@/hooks/useData';
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
  } = useData(API_PATH, initState);

  return {
    factionSystems,
    loading: isLoading,
    error,
    addSystem,
    updateSystem,
    deleteSystem,
  };
};
