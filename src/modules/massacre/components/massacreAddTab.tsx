import { CenteredTypography } from '@/components/_common';
import { Button, Paper, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { ChangeEvent, useContext, useState } from 'react';
import { MassacreContext } from '~/massacre/providers/massacreTrackerProvider';

/**
 * 1. Ask user for system.
 * 2. Get populated systems within 10 LY
 * 3. Ask user to select possible systems
 * 4. Get stations within the possible systems
 */

export const MassacreAddTab = () => {
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

    if (context?.trackers.find((x) => x.hazRezSystem.trim() === system.toUpperCase().trim())) {
      enqueueSnackbar('That tracker already exists', { variant: 'info' });
      context?.setSelectedTab(system.toUpperCase());
      return;
    }

    const response = await context?.addTracker(system);
    if (typeof response === 'string') {
      enqueueSnackbar(response, {
        variant: 'info',
      });
    } else {
      context?.setSelectedTab(response.hazRezSystem);
    }
  };

  return (
    <>
      <CenteredTypography variant="h4">Add a Massacre HazRez System</CenteredTypography>
      <Paper sx={{ width: '90%', margin: 'auto', p: 1 }}>
        <div>
          <Typography>Enter the HazRez system for reference</Typography>
          <TextField value={system} onChange={handleTextChange} label="HazRez System" />
          <Button onClick={handleSystemSubmission} data-testid="system-submit">
            Submit System
          </Button>
        </div>
      </Paper>
    </>
  );
};
