import axios from 'axios';
import { IAlly } from 'models/about/ally';
import useSWR, { mutate } from 'swr';

const addAlly = async (ally: IAlly) => {
  try {
    await axios.post<IAlly>('/api/allies', ally);
    mutate('/api/allies');
  } catch (error) {
    throw new Error(error.response.statusText);
  }
};

const updateAlly = async (ally: IAlly) => {
  try {
    await axios.put('/api/allies', ally);
    mutate('/api/allies');
  } catch (error) {
    throw new Error(error.response.statusText);
  }
};

const deleteAlly = async (ally: IAlly) => {
  try {
    await axios.delete(`/api/allies?id=${ally._id}`);
    mutate('/api/allies');
  } catch (error) {
    throw new Error(error.response.statusText);
  }
};

export const useAllies = () => {
  const { data, error } = useSWR('/api/allies', (url: string) =>
    axios.get<IAlly[]>(url)
  );
  const allies = data?.data ?? [];

  return {
    allies,
    loading: !error && !data,
    error,
    addAlly,
    updateAlly,
    deleteAlly,
  };
};
