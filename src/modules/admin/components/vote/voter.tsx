import { FillerDiv } from '@/components/_common';
import { Check, Clear, Remove } from '@mui/icons-material';
import { styled, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { MouseEvent, useState } from 'react';
import { IVoter } from '~/admin/models';

const StyledDiv = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const Voter = ({ voter }: { voter: IVoter }) => {
  const [vote, setVote] = useState<'yay' | 'nay' | 'nil'>('nil');

  const handleVote = (_: MouseEvent<HTMLElement>, newVote: 'yay' | 'nay' | 'nil') => {
    setVote(newVote);
  };
  return (
    <StyledDiv data-testid={`voter-${voter.name}`}>
      <Typography>{voter.name}</Typography>
      <FillerDiv />
      <ToggleButtonGroup value={vote} exclusive onChange={handleVote}>
        <ToggleButton value="yay" color="success">
          <Check />
        </ToggleButton>
        <ToggleButton value="nil">
          <Remove />
        </ToggleButton>
        <ToggleButton value="nay" color="error">
          <Clear />
        </ToggleButton>
      </ToggleButtonGroup>
    </StyledDiv>
  );
};
