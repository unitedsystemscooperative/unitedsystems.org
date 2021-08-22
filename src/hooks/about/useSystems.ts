import axios from 'axios';
import { System } from 'models/about/system';
import useSWR, { mutate } from 'swr';

const addSystem = async (system: System) => {
  try {
    await axios.post<System>('/api/systems', system);
    mutate('/api/systems');
  } catch (error) {
    throw new Error(error.response.statusText);
  }
};

const updateSystem = async (system: System) => {
  try {
    await axios.put('/api/systems', system);
    mutate('/api/systems');
  } catch (error) {
    throw new Error(error.response.statusText);
  }
};

const deleteSystem = async (system: System) => {
  try {
    await axios.delete(`/api/systems?id=${system._id}`);
    mutate('/api/systems');
  } catch (error) {
    throw new Error(error.response.statusText);
  }
};

export const useSystems = () => {
  const { data, error } = useSWR('/api/systems', (url: string) =>
    axios.get<System[]>(url)
  );
  const factionSystems = data?.data ?? [];
  return {
    factionSystems,
    loading: !error && !data,
    error,
    addSystem,
    updateSystem,
    deleteSystem,
  };
};
