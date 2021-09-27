import { Button, Paper, TextField, Typography } from '@mui/material';
import { CenteredTypography } from 'components/_common/typography';
import { processHazRezSystem } from 'functions/processHazRezSystem';
import { IFactionwMissions, IMassacreTrack } from 'models/massacreTrack';
import { ReputationLevels } from 'models/reputationLevels';
import { useSnackbar } from 'notistack';
import { MassacreContext } from 'providers/massacreTrackerProvider';
import { ChangeEvent, useContext, useState } from 'react';

/**
 * 1. Ask user for system.
 * 2. Get populated systems within 10 LY
 * 3. Ask user to select possible systems
 * 4. Get stations within the possible systems
 */

export const MassacreTabAddPanel = () => {
  const context = useContext(MassacreContext);
  const [system, setSystem] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSystem(event.target.value);
  };

  const handleSystemSubmission = async () => {
    if (system === '') {
      enqueueSnackbar('Please enter a system', { variant: 'warning' });
      return;
    }

    const result = await processHazRezSystem(system);

    let factions: IFactionwMissions[] = [];

    result.forEach((r) => {
      r.factions.forEach((f) => {
        if (factions.find((x) => x.id === f.id)) {
          // do nothing
        } else {
          const newFaction: IFactionwMissions = {
            name: f.name,
            id: f.id,
            removed: false,
            reputation: ReputationLevels.allied,
            missions: [null, null, null, null, null],
          };
          factions = [...factions, newFaction];
        }
      });
    });
    const final: IMassacreTrack = {
      hazRezSystem: system,
      systemsin10LY: result,
      factions,
      current: true,
    };

    const response = context?.addTracker(final);
    if (response) {
      enqueueSnackbar(response, {
        variant: 'info',
      });
    }

    context?.setSelectedTab(final.hazRezSystem);
  };

  return (
    <>
      <CenteredTypography variant="h4">
        Add a Massacre HazRez System
      </CenteredTypography>
      <Paper sx={{ width: '90%', margin: 'auto', p: 1 }}>
        <div>
          <Typography>Enter the HazRez system for reference</Typography>
          <TextField
            value={system}
            onChange={handleTextChange}
            label="HazRez System"
          />
          <Button onClick={handleSystemSubmission}>Submit System</Button>
        </div>
      </Paper>
    </>
  );
};
