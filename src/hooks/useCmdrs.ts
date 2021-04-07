import axios from 'axios';
import {
  CMDRType,
  IAmbassador,
  ICMDR,
  IGuest,
  IMember,
} from 'models/admin/cmdr';
import { Rank } from 'models/admin/ranks';
import useSWR, { mutate } from 'swr';

const checkInstanceofAmbassador = (cmdr: ICMDR): cmdr is IAmbassador =>
  cmdr.rank === Rank.Ambassador;
const checkInstanceofGuest = (cmdr: ICMDR): cmdr is IGuest =>
  cmdr.rank === Rank.Guest;
const checkInstanceofMember = (cmdr: ICMDR): cmdr is IMember =>
  cmdr.rank >= Rank.FleetAdmiral && cmdr.rank <= Rank.Reserve;

const addCMDR = async (cmdr: ICMDR, type: CMDRType) => {
  try {
    await axios.post<ICMDR>('/api/cmdrs', { type, cmdr });
    mutate('/api/cmdrs');
  } catch (error) {
    throw new Error(error.response.statusText);
  }
};

const updateCMDR = async (cmdr: ICMDR, type: CMDRType) => {
  try {
    await axios.put('/api/cmdrs', { type, cmdr });
    mutate('/api/cmdrs');
  } catch (error) {
    throw new Error(error.response.statusText);
  }
};

const updateCMDRs = async (
  cmdrs: IAmbassador[] | IGuest[] | IMember[],
  updateInfo: IAmbassador | IGuest | IMember,
  type: CMDRType
) => {
  let failedUpdates: ICMDR[] = [];
  for (const cmdr of cmdrs) {
    if (updateInfo.discordJoinDate) {
      cmdr.discordJoinDate = updateInfo.discordJoinDate;
    }
    if (updateInfo.platform) {
      cmdr.platform = updateInfo.platform;
    }
    if (updateInfo.region) {
      cmdr.region = updateInfo.region;
    }
    if (checkInstanceofMember(cmdr) && checkInstanceofMember(updateInfo)) {
      if (updateInfo.joinDate) {
        cmdr.joinDate = updateInfo.joinDate;
      }
      if (updateInfo.rank) {
        cmdr.rank = updateInfo.rank;
      }
      if (updateInfo.isInInaraSquad) {
        cmdr.isInInaraSquad = updateInfo.isInInaraSquad;
      }
      if (updateInfo.notes) {
        cmdr.notes = updateInfo.notes;
      }
      if (updateInfo.promotion) {
        cmdr.promotion = updateInfo.promotion;
      }
      if (updateInfo.entersVoice) {
        cmdr.entersVoice = updateInfo.entersVoice;
      }
    }

    try {
      await axios.put('/api/cmdrs', { type, cmdr });
    } catch (error) {
      failedUpdates = [...failedUpdates, cmdr];
    }
  }
  mutate('/api/cmdrs');
  if (failedUpdates.length > 0) {
    throw new Error(`${failedUpdates.length} Updates failed.`);
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
    updateCMDRs,
    deleteCMDR,
  };
};
