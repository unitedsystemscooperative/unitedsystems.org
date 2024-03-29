import { useCMDRs } from '@/hooks/useCmdrs';
import { ICMDRs, IVoter, Rank } from '@@/admin/models';
import { Container, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Voter } from './voter';

export const VoteDashboard = ({ init }: { init?: ICMDRs }) => {
  const {
    cmdrs: { members },
    loading,
  } = useCMDRs(init);
  const [voteInfo, setVoteInfo] = useState<IVoter[]>([]);

  // useEffect(() => {
  //   if (window) {
  //     const store: IVoter[] | null = JSON.parse(
  //       window.localStorage.getItem('voters') ?? ''
  //     );
  //     if (store && store.length > 0) {
  //       setVoteInfo(store);
  //     }
  //   }
  // }, []);

  useEffect(() => {
    if (!loading && voteInfo.length < 1) {
      const hcCmdrs = members.filter((c) => c.rank <= Rank.Captain && c.isDeleted !== true);
      let hcVoters: IVoter[] = [];
      for (const voter of hcCmdrs) {
        hcVoters = [...hcVoters, { name: voter.cmdrName.toUpperCase(), hasVoted: null }];
      }
      setVoteInfo(hcVoters);
    }
  }, [loading, members, voteInfo]);

  return (
    <>
      <Typography variant="h3" sx={{ textAlign: 'center' }}>
        Vote Assistant
      </Typography>
      <Container maxWidth="xs" component={Paper} sx={{ py: 1 }}>
        {voteInfo.map((voter) => (
          <Voter key={voter.name} voter={voter} />
        ))}
      </Container>
    </>
  );
};
