import axios from 'axios';
import { IUser } from 'models/auth/user';
import useSWR, { mutate } from 'swr';

const addUser = async (user: IUser) => {
  try {
    await axios.post<IUser>('/api/users', user);
    mutate('/api/users');
  } catch (error) {
    throw new Error(error.response.statusText);
  }
};

const updateUser = async (user: IUser) => {
  try {
    await axios.put('/api/users', user);
    mutate('/api/users');
  } catch (error) {
    throw new Error(error.response.statusText);
  }
};

const deleteUser = async (user: IUser) => {
  try {
    await axios.delete(`/api/users?id=${user._id}`);
    mutate('/api/users');
  } catch (error) {
    throw new Error(error.response.statusText);
  }
};

export const useUsers = () => {
  const { data, error } = useSWR('/api/users', (url: string) =>
    axios.get<IUser[]>(url)
  );
  const users = data?.data ?? [];

  return {
    users,
    loading: !error && !data,
    error,
    addUser,
    updateUser,
    deleteUser,
  };
};
