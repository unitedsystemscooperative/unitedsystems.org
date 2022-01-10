import { EDSpinner } from '@admiralfeb/react-components';
import { Container, Paper, Typography } from '@mui/material';
import { useVoteInfo } from '../../hooks/useVoteInfo';
import { Voter } from './voter';

export const VoteDashboard = () => {
  const { loading, voters } = useVoteInfo();

  if (loading) {
    return <EDSpinner />;
  }

  return (
    <>
      <Typography variant="h3" sx={{ textAlign: 'center' }}>
        Vote Assistant
      </Typography>
      <Container maxWidth="xs" component={Paper} sx={{ py: 1 }}>
        {voters.map((voter) => (
          <Voter key={voter.name} voter={voter} />
        ))}
      </Container>
    </>
  );
};
