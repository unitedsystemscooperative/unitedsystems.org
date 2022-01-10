import { useData } from '@/hooks/useData';
import { IAlly } from '~/about/models/ally';

const API_PATH = '/api/allies';

export const useAllies = (initState?: IAlly[]) => {
  const {
    data: allies,
    error,
    isLoading,
    addItem: addAlly,
    updateItem: updateAlly,
    deleteItem: deleteAlly,
  } = useData(API_PATH, initState);

  return {
    allies,
    loading: isLoading,
    error,
    addAlly,
    updateAlly,
    deleteAlly,
  };
};
