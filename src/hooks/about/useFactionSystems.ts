import axios from 'axios';
import useSWR from 'swr';

export const useFactionSystems = () => {
  const { data, error } = useSWR('/api/factionSystems', (url: string) =>
    axios.get(url)
  );
  const factionSystems = data?.data ?? [];

  return { factionSystems, loading: !error && !data, error };
};
