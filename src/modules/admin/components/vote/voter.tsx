import { IVoter } from '~/admin/models';
import { Check, Clear, Remove } from '@mui/icons-material';
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { MouseEvent, useState } from 'react';

export const Voter = ({ voter }: { voter: IVoter }) => {
  const [vote, setVote] = useState<boolean | null>(null);

  const handleVote = (_: MouseEvent<HTMLElement>, newVote: boolean | null) => {
    setVote(newVote);
  };
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Typography>{voter.name}</Typography>
      <div style={{ flexGrow: 1 }} />
      <ToggleButtonGroup value={vote} exclusive onChange={handleVote}>
        <ToggleButton value={true}>
          <Check />
        </ToggleButton>
        <ToggleButton value={null}>
          <Remove />
        </ToggleButton>
        <ToggleButton value={false}>
          <Clear />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};
