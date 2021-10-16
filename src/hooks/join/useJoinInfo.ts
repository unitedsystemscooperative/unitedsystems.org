import axios from 'axios';
import { IJoinRequest } from 'models/join/joinRequest';
import { useMemo } from 'react';
import useSWR from 'swr';

const API_PATH = '/api/joinRequests';

export const useJoinRequests = () => {
  const { data, error } = useSWR(API_PATH, (url: string) => axios.get<IJoinRequest[]>(url));
  const requests = useMemo(() => data?.data ?? [], [data.data]);

  const loading = useMemo(() => !data && !error, [data, error]);

  const members = useMemo(() => {
    if (loading || error) {
      return [];
    }
    return requests.filter((x) => x.type === 'join');
  }, [requests, loading, error]);
  const guests = useMemo(() => {
    if (loading || error) {
      return [];
    }
    return requests.filter((x) => x.type === 'guest');
  }, [requests, loading, error]);
  const ambassadors = useMemo(() => {
    if (loading || error) {
      return [];
    }
    return requests.filter((x) => x.type === 'ambassador');
  }, [requests, loading, error]);

  const addJoinRequest = async (request: IJoinRequest) => {
    try {
      await axios.post(API_PATH, request);
    } catch (e) {
      throw new Error(`Unable to add. ${e.message}`);
    }
  };

  return { members, guests, ambassadors, loading, error, addJoinRequest };
};
