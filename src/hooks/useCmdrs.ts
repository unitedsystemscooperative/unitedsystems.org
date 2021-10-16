import axios from 'axios';
import { IAmbassador, ICMDR, IGuest, IMember } from 'models/admin/cmdr';
import { Rank, RankString } from 'models/admin/ranks';
import useSWR from 'swr';

const checkInstanceofAmbassador = (cmdr: ICMDR): cmdr is IAmbassador => cmdr.rank === Rank.Ambassador;
const checkInstanceofGuest = (cmdr: ICMDR): cmdr is IGuest => cmdr.rank === Rank.Guest;
const checkInstanceofMember = (cmdr: ICMDR): cmdr is IMember =>
  cmdr.rank >= Rank.FleetAdmiral && cmdr.rank <= Rank.Reserve;

const API_PATH = '/api/cmdrs';

export const useCMDRs = () => {
  const { data, error, mutate } = useSWR(API_PATH, (url: string) =>
    axios.get<{
      members: IMember[];
      guests: IGuest[];
      ambassadors: IAmbassador[];
    }>(url)
  );

  const cmdrs = data?.data ?? { members: [], guests: [], ambassadors: [] };
  cmdrs.members = cmdrs.members.map((cmdr) => {
    cmdr.joinDate = new Date(cmdr.joinDate);
    cmdr.discordJoinDate = new Date(cmdr.discordJoinDate);
    cmdr.rankString = RankString[cmdr.rank];
    return cmdr;
  });
  cmdrs.ambassadors = cmdrs.ambassadors.map((cmdr) => {
    cmdr.discordJoinDate = new Date(cmdr.discordJoinDate);
    return cmdr;
  });
  cmdrs.guests = cmdrs.guests.map((cmdr) => {
    cmdr.discordJoinDate = new Date(cmdr.discordJoinDate);
    return cmdr;
  });

  const addCMDR = async (cmdr: IAmbassador | IGuest | IMember) => {
    try {
      await axios.post(API_PATH, cmdr);
      mutate();
    } catch (error) {
      throw new Error(error.response.statusText);
    }
  };

  const updateCMDR = async (cmdr: IAmbassador | IGuest | IMember) => {
    try {
      if (checkInstanceofMember(cmdr)) {
        if (cmdr['promotion']) {
          if (cmdr['promotion'] < 0) {
            cmdr.promotion = null;
          } else {
            cmdr.promotion = cmdr['promotion'];
          }
        }
      }
      await axios.put(API_PATH, cmdr);
      mutate();
    } catch (error) {
      throw new Error(error.response.statusText);
    }
  };

  const updateCMDRs = async (
    cmdrs: IAmbassador[] | IGuest[] | IMember[],
    updateInfo: IAmbassador | IGuest | IMember
  ) => {
    let failedUpdates: ICMDR[] = [];
    for (const cmdr of cmdrs) {
      if (updateInfo.platform) {
        cmdr.platform = updateInfo.platform;
      }
      if (updateInfo.region) {
        cmdr.region = updateInfo.region;
      }
      if (checkInstanceofMember(cmdr)) {
        if (updateInfo.rank) {
          cmdr.rank = updateInfo.rank;
        }
        if (updateInfo['isInInaraSquad']) {
          cmdr.isInInaraSquad = updateInfo['isInInaraSquad'];
        }
        if (updateInfo.notes) {
          cmdr.notes = updateInfo.notes;
        }
        if (updateInfo['promotion']) {
          if (updateInfo['promotion'] === -2 || updateInfo['promotion'] === -1) {
            cmdr.promotion = null;
          } else {
            cmdr.promotion = updateInfo['promotion'];
          }
        }
        if (updateInfo['entersVoice']) {
          cmdr.entersVoice = updateInfo['entersVoice'];
        }
      }
      if (checkInstanceofAmbassador(cmdr)) {
        if (updateInfo['groupRepresented']) {
          cmdr.groupRepresented = updateInfo['groupRepresented'];
        }
      }
      if (checkInstanceofGuest(cmdr)) {
        // do nothing
      }

      try {
        await axios.put(API_PATH, cmdr);
      } catch (error) {
        failedUpdates = [...failedUpdates, cmdr];
      }
    }
    mutate();
    if (failedUpdates.length > 0) {
      throw new Error(`${failedUpdates.length} Updates failed.`);
    }
  };

  const restoreCMDR = async (cmdr: IAmbassador | IGuest | IMember) => {
    cmdr.isDeleted = false;
    try {
      await axios.put(API_PATH, cmdr);
      mutate();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const deleteCMDR = async (cmdrs: string[]) => {
    try {
      for (const cmdr of cmdrs) {
        await axios.delete(`${API_PATH}?id=${cmdr}`);
      }
      mutate();
    } catch (error) {
      throw new Error(error.response.statusText);
    }
  };

  return {
    cmdrs,
    loading: !error && !data,
    error,
    addCMDR,
    updateCMDR,
    updateCMDRs,
    deleteCMDR,
    restoreCMDR,
  };
};
