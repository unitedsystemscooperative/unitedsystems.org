import { IAlly } from '@/about/_models/ally';
import axios from 'axios';
import useSWR from 'swr';

const API_PATH = '/api/allies';

export const useAllies = (initState?: IAlly[]) => {
  const {
    data: allies,
    mutate,
    error,
  } = useSWR(API_PATH, (url: string) => axios.get<IAlly[]>(url).then((res) => res.data ?? []), {
    fallbackData: initState,
  });

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
    loading: !allies && !error,
    error,
    addAlly,
    updateAlly,
    deleteAlly,
  };
};
