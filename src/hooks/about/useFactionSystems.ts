import { useQuery } from '@apollo/client';
import { AllFactionSystems } from 'gql/queries/factionSystems';

export const useFactionSystems = () => {
  const { data, loading, error } = useQuery<{
    factionSystems: { text: string; link: string }[];
  }>(AllFactionSystems);
  const factionSystems = data?.factionSystems ?? [];

  return { factionSystems, loading, error };
};
