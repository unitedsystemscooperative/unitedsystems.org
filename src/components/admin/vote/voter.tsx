import { makeStyles, Typography } from '@material-ui/core';
import { Check, Clear, Remove } from '@material-ui/icons';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { IVoter } from 'models/admin/voter';
import React, { useState, MouseEvent } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expand: {
    flexGrow: 1,
  },
  text: {},
}));

export const Voter = ({ voter }: { voter: IVoter }) => {
  const classes = useStyles();
  const [vote, setVote] = useState<boolean | null>(null);

  const handleVote = (_: MouseEvent<HTMLElement>, newVote: boolean | null) => {
    setVote(newVote);
  };
  return (
    <div className={classes.root}>
      <Typography>{voter.name}</Typography>
      <div className={classes.expand} />
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
