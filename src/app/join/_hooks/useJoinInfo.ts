import { IJoinRequest } from '@/app/join/_models/joinRequest';
import axios from 'axios';
import { useMemo } from 'react';
import useSWR from 'swr';

const API_PATH = '/api/joinRequests';

export const useJoinRequests = () => {
  const { data: requests, error } = useSWR(
    API_PATH,
    (url: string) => axios.get<IJoinRequest[]>(url).then((data) => data.data ?? []),
    { fallbackData: [] }
  );

  const members = useMemo(() => {
    return requests.filter((x) => x.type === 'join');
  }, [requests]);
  const guests = useMemo(() => {
    return requests.filter((x) => x.type === 'guest');
  }, [requests]);
  const ambassadors = useMemo(() => {
    return requests.filter((x) => x.type === 'ambassador');
  }, [requests]);

  const addJoinRequest = async (request: IJoinRequest) => {
    try {
      await axios.post(API_PATH, request);
    } catch (e) {
      throw new Error(`Unable to add. ${e.message}`);
    }
  };

  return { members, guests, ambassadors, loading: !requests && !error, error, addJoinRequest };
};
