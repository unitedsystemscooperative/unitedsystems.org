import axios from 'axios';
import { IUser } from 'models/auth/user';
import useSWR from 'swr';

export const useUser = () => {
  const { data, error } = useSWR('/api/auth/user', (url: string) =>
    axios.get<IUser>(url)
  );
  const user = data?.data;

  return { user, loading: !error && !data, error };
};
