import { System } from '@/about/_models/system';
import axios from 'axios';
import useSWR from 'swr';

const API_PATH = '/api/systems';

export const useSystems = (init?: System[]) => {
  const {
    data: factionSystems,
    error,
    mutate,
  } = useSWR(API_PATH, (url: string) => axios.get<System[]>(url).then((data) => data?.data ?? []), {
    fallbackData: init,
  });

  const addSystem = async (system: System) => {
    try {
      await axios.post<System>(API_PATH, system);
      mutate();
    } catch (error) {
      throw new Error(error.response.statusText);
    }
  };

  const updateSystem = async (system: System) => {
    try {
      await axios.put(API_PATH, system);
      mutate();
    } catch (error) {
      throw new Error(error.response.statusText);
    }
  };

  const deleteSystem = async (system: System) => {
    try {
      await axios.delete(`${API_PATH}?id=${system._id}`);
      mutate();
    } catch (error) {
      throw new Error(error.response.statusText);
    }
  };

  return {
    factionSystems,
    loading: !error && !factionSystems,
    error,
    addSystem,
    updateSystem,
    deleteSystem,
  };
};
