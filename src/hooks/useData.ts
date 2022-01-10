import { IDbItem } from '@/models/dbItem';
import axios from 'axios';
import useSWR from 'swr';

export const useData = <T extends IDbItem>(api_path: string, init: T[]) => {
  const { data, mutate, error } = useSWR(
    api_path,
    (url: string) => axios.get<T[]>(url).then((res) => res.data),
    { fallbackData: init }
  );

  const addItem = async (item: T) => {
    try {
      await axios.post<T>(api_path, item);
      mutate();
    } catch (e) {
      throw new Error(e.response.statusText);
    }
  };

  const updateItem = async (item: T) => {
    try {
      await axios.put<T>(api_path, item);
      mutate();
    } catch (e) {
      throw new Error(e.response.statusText);
    }
  };

  const deleteItem = async (item: T) => {
    try {
      await axios.delete(`${api_path}?id=${item._id}`);
      mutate();
    } catch (e) {
      throw new Error(e.response.statusText);
    }
  };

  return {
    data,
    error,
    isLoading: !data && !error,
    addItem,
    updateItem,
    deleteItem,
  };
};
