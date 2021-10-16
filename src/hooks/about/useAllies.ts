import axios from 'axios';
import { IAlly } from 'models/about/ally';
import useSWR from 'swr';

const API_PATH = '/api/allies';

export const useAllies = () => {
  const { data, error, mutate } = useSWR(API_PATH, (url: string) => axios.get<IAlly[]>(url));
  const allies = data?.data ?? [];

  const addAlly = async (ally: IAlly) => {
    try {
      await axios.post<IAlly>(API_PATH, ally);
      mutate();
    } catch (error) {
      throw new Error(error.response.statusText);
    }
  };

  const updateAlly = async (ally: IAlly) => {
    try {
      await axios.put(API_PATH, ally);
      mutate();
    } catch (error) {
      throw new Error(error.response.statusText);
    }
  };

  const deleteAlly = async (ally: IAlly) => {
    try {
      await axios.delete(`${API_PATH}?id=${ally._id}`);
      mutate();
    } catch (error) {
      throw new Error(error.response.statusText);
    }
  };

  return {
    allies,
    loading: !error && !data,
    error,
    addAlly,
    updateAlly,
    deleteAlly,
  };
};
