import axios from 'axios';
import useSWR from 'swr';

export const useAdmin = () => {
  const { data, error } = useSWR('/api/auth/admin', (url: string) =>
    axios.get<boolean>(url)
  );

  if (error) {
    return false;
  }
  const isCommand = data?.data;
  return isCommand;
};
