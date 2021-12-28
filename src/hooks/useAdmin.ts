import axios from 'axios';
import useSWR from 'swr';

const API_PATH = '/api/auth/admin';

export const useAdmin = () => {
  const { data, error } = useSWR(API_PATH, (url: string) =>
    axios.get<{ isAdmin: boolean }>(url).then((res) => res.data)
  );

  if (error) {
    return false;
  }
  return data?.isAdmin ?? false;
};
