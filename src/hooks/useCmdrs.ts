import axios from 'axios';
import {
  CMDRType,
  IAmbassador,
  ICMDR,
  IGuest,
  IMember,
} from 'models/admin/cmdr';
import useSWR, { mutate } from 'swr';

const addCMDR = async (cmdr: ICMDR) => {
  try {
    await axios.post<ICMDR>('/api/cmdrs', { type: CMDRType.Member, cmdr });
    mutate('/api/cmdrs');
  } catch (error) {
    throw new Error(error.response.statusText);
  }
};

const updateCMDR = async (cmdr: ICMDR) => {
  try {
    await axios.put('/api/cmdrs', { type: CMDRType.Member, cmdr });
    mutate('/api/cmdrs');
  } catch (error) {
    throw new Error(error.response.statusText);
  }
};

const deleteCMDR = async (cmdrs: string[]) => {
  try {
    for (const cmdr of cmdrs) {
      await axios.delete(`/api/cmdrs?id=${cmdr}`);
    }
    mutate('/api/cmdrs');
  } catch (error) {
    throw new Error(error.response.statusText);
  }
};

export const useCMDRs = () => {
  const { data, error } = useSWR('/api/cmdrs', (url: string) =>
    axios.get<{
      members: IMember[];
      guests: IGuest[];
      ambassadors: IAmbassador[];
    }>(url)
  );

  const cmdrs = data?.data ?? { members: [], guests: [], ambassadors: [] };

  return {
    cmdrs,
    loading: !error && !data,
    error,
    addCMDR,
    updateCMDR,
    deleteCMDR,
  };
};
