import axios from 'axios';
import useSWR from 'swr';

const API_PATH = '/api/auth/admin';

export const useAdmin = () => {
  const { data, error } = useSWR(API_PATH, (url: string) => axios.get<boolean>(url));

  if (error) {
    return false;
  }
  const isCommand = data?.data;
  return isCommand;
};
