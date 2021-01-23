import { IJoinInfo } from 'models/join/joinInfo';
import { useMemo } from 'react';
import useSWR from 'swr';
import axios from 'axios';

export const useJoinInfo = () => {
  const { allJoiners, loading, error } = useAllJoinInfo();
  console.log(allJoiners);

  const joiners = useMemo(() => {
    if (loading || error) {
      return undefined;
    }
    return allJoiners.filter((x) => x.type === 'join');
  }, [allJoiners, loading, error]);
  const guests = useMemo(() => {
    if (loading || error) {
      return undefined;
    }
    return allJoiners.filter((x) => x.type === 'guest');
  }, [allJoiners, loading, error]);
  const ambassadors = useMemo(() => {
    if (loading || error) {
      return undefined;
    }
    return allJoiners.filter((x) => x.type === 'ambassador');
  }, [allJoiners, loading, error]);

  return { joiners, guests, ambassadors, loading, error };
};

export const useAllJoinInfo = () => {
  const { data, error } = useSWR('/api/joiners', (url: string) =>
    axios.get(url)
  );
  const allJoiners = data?.data ?? [];

  return { allJoiners, loading: !error && !data, error };
};

export const useAddJoinInfo = () => {
  const addJoiner = async (joiner: IJoinInfo) => {
    try {
      await axios.post('/api/joiners', joiner);
    } catch (e) {
      throw new Error(`Unable to add. ${e.message}`);
    }
  };

  return addJoiner;
};
