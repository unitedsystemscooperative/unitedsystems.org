import { Container, Paper, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useCMDRs } from 'hooks/useCmdrs';
import { Rank } from 'models/admin/ranks';
import { IVoter } from 'models/admin/voter';
import { useEffect, useState } from 'react';
import { Voter } from './voter';

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
  },
  paper: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export const VoteDashboard = () => {
  const classes = useStyles();
  const { cmdrs, loading } = useCMDRs();
  const [voteInfo, setVoteInfo] = useState<IVoter[]>([]);

  useEffect(() => {
    if (window) {
      const store: IVoter[] | null = JSON.parse(
        window.localStorage.getItem('voters')
      );
      if (store && store.length > 0) {
        setVoteInfo(store);
      }
    }
  }, []);

  useEffect(() => {
    if (!loading && voteInfo.length < 1) {
      const hcCmdrs = cmdrs.members.filter(
        (c) => c.rank <= Rank.Captain && c.isDeleted !== true
      );
      let hcVoters: IVoter[] = [];
      for (const voter of hcCmdrs) {
        hcVoters = [
          ...hcVoters,
          { name: voter.cmdrName.toUpperCase(), hasVoted: null },
        ];
      }
      setVoteInfo(hcVoters);
    }
  }, [loading, cmdrs.members, voteInfo]);

  return (
    <>
      <Typography variant="h3" className={classes.title}>
        Vote Assistant
      </Typography>
      <Container maxWidth="xs" component={Paper} className={classes.paper}>
        {voteInfo.map((voter) => (
          <Voter key={voter.name} voter={voter} />
        ))}
      </Container>
    </>
  );
};
