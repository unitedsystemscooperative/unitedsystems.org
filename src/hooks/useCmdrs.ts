import axios from 'axios';
import { ICMDR } from 'models/admin/cmdr';
import useSWR, { mutate } from 'swr';

const addCMDR = async (cmdr: ICMDR) => {
  try {
    await axios.post<ICMDR>('/api/cmdrs', cmdr);
    mutate('/api/cmdrs');
  } catch (error) {
    throw new Error(error.response.statusText);
  }
};

const updateCMDR = async (cmdr: ICMDR) => {
  try {
    await axios.put('/api/cmdrs', cmdr);
    mutate('/api/cmdrs');
  } catch (error) {
    throw new Error(error.response.statusText);
  }
};

const deleteCMDR = async (cmdr: ICMDR) => {
  try {
    await axios.delete(`/api/cmdrs?id=${cmdr._id}`);
    mutate('/api/cmdrs');
  } catch (error) {
    throw new Error(error.response.statusText);
  }
};

export const useCMDRs = () => {
  const { data, error } = useSWR('/api/cmdrs', (url: string) =>
    axios.get<ICMDR[]>(url)
  );
  const cmdrs = data?.data ?? [];

  return {
    cmdrs,
    loading: !error && !data,
    error,
    addCMDR,
    updateCMDR,
    deleteCMDR,
  };
};
