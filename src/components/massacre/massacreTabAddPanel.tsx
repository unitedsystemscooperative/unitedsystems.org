import {
  Button,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  getFactionsinSystem,
  getStationsinSystem,
  getSystemsinSphere,
} from 'functions';
import { sortItems } from 'functions/sort';
import { IFactionwMissions, IMassacreTrack } from 'models/massacreTrack';
import { ReputationLevels } from 'models/reputationLevels';
import { useSnackbar } from 'notistack';
import { MassacreContext } from 'providers/massacreTrackerProvider';
import React, { ChangeEvent, useContext, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '90%',
    margin: 'auto',
    padding: theme.spacing(1),
  },
  center: {
    textAlign: 'center',
  },
}));

/**
 * 1. Ask user for system.
 * 2. Get populated systems within 10 LY
 * 3. Ask user to select possible systems
 * 4. Get stations within the possible systems
 */

export const MassacreTabAddPanel = () => {
  const context = useContext(MassacreContext);
  const [system, setSystem] = useState('');
  const classes = useStyles();
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
    console.log(result);

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
      <Typography variant="h4" className={classes.center}>
        Add a Massacre HazRez System
      </Typography>
      <Paper className={classes.paper}>
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

const processHazRezSystem = async (system: string) => {
  const systemsInSphere = await getSystemsinSphere(system, 10);
  const populatedSystems = systemsInSphere.filter(
    (x) => Object.keys(x.information).length > 0
  );
  const systems = await Promise.all(
    populatedSystems.map(async (x) => {
      const factionsinSystem = await getFactionsinSystem(x.name);
      const factions = factionsinSystem.factions
        .map((faction) => {
          const name = faction.name;
          const id = faction.id;
          const influence = faction.influence;
          const removed = false;
          return { name, id, influence, removed };
        })
        .filter((faction) => faction.influence > 0);

      const stationsinSystem = await getStationsinSystem(x.name);
      const stations = stationsinSystem.stations
        .map((station) => {
          const type = station.type;
          const name = station.name;
          const distance = station.distanceToArrival;
          return { type, name, distance };
        })
        .filter((station) => station.type !== 'Fleet Carrier');

      const sortedStations = sortItems(stations, 'distance');

      return { name: x.name, factions, stations: sortedStations };
    })
  );
  return systems;
};
