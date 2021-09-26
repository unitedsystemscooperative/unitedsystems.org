import { IJoinRequest } from 'models/join/joinRequest';
import { useMemo } from 'react';
import useSWR from 'swr';
import axios from 'axios';

export const useJoinRequests = () => {
  const { requests, loading, error } = useAllJoinRequests();

  const members = useMemo(() => {
    if (loading || error) {
      return undefined;
    }
    return requests.filter((x) => x.type === 'join');
  }, [requests, loading, error]);
  const guests = useMemo(() => {
    if (loading || error) {
      return undefined;
    }
    return requests.filter((x) => x.type === 'guest');
  }, [requests, loading, error]);
  const ambassadors = useMemo(() => {
    if (loading || error) {
      return undefined;
    }
    return requests.filter((x) => x.type === 'ambassador');
  }, [requests, loading, error]);

  return { members, guests, ambassadors, loading, error };
};

export const useAllJoinRequests = () => {
  const { data, error } = useSWR('/api/joinRequests', (url: string) =>
    axios.get<IJoinRequest[]>(url)
  );
  const requests = data?.data ?? [];

  return { requests, loading: !error && !data, error };
};

export const useAddJoinRequest = () => {
  const addJoiner = async (joiner: IJoinRequest) => {
    try {
      await axios.post('/api/joinRequests', joiner);
    } catch (e) {
      throw new Error(`Unable to add. ${e.message}`);
    }
  };

  return addJoiner;
};
