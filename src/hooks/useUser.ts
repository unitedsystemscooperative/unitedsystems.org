import axios from 'axios';
import { IMember } from 'models/auth/member';
import useSWR from 'swr';

export const useUser = () => {
  const { data, error } = useSWR('/api/auth/user', (url: string) =>
    axios.get<IMember>(url)
  );
  const user = data?.data;

  return { user, loading: !error && !data, error };
};
