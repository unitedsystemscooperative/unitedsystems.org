import { useCMDRs } from '@/hooks/useCmdrs';
import { useMemo } from 'react';
import { IVoter, Rank } from '../models';

export const useVoteInfo = () => {
  const {
    cmdrs: { members },
    loading,
  } = useCMDRs();

  const voters = useMemo(() => {
    if (!loading) {
      const hcCmdrs = members.filter((c) => c.rank <= Rank.Captain && c.isDeleted !== true);
      const hcVoters: IVoter[] = hcCmdrs.map((cmdr) => ({
        name: cmdr.cmdrName.toUpperCase(),
        hasVoted: 'nil',
      }));
      return hcVoters;
    }
  }, [loading, members]);

  return { loading, voters };
};
