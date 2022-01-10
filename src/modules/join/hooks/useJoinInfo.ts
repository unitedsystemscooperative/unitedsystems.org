import { useArrayData } from '@/hooks/useArrayData';
import { useMemo } from 'react';
import { IJoinRequest } from '~/join/models/joinRequest';

const API_PATH = '/api/joinRequests';

export const useJoinRequests = () => {
  const {
    data: requests,
    error,
    isLoading,
    addItem: addJoinRequest,
  } = useArrayData<IJoinRequest>(API_PATH);

  const members = useMemo(() => {
    return requests?.filter((x) => x.type === 'join');
  }, [requests]);
  const guests = useMemo(() => {
    return requests?.filter((x) => x.type === 'guest');
  }, [requests]);
  const ambassadors = useMemo(() => {
    return requests?.filter((x) => x.type === 'ambassador');
  }, [requests]);

  return { members, guests, ambassadors, error, loading: isLoading, addJoinRequest };
};
