import { Button, Container, makeStyles, Typography } from '@material-ui/core';
import {
  getFactionsinSystem,
  getStationsinSystem,
  getSystemsinSphere,
} from 'functions/edsmQueries';
import { sortItems } from 'functions/sort';
import { IFactionwMissions, IMassacreTrack } from 'models/massacreTrack';
import { ReputationLevels } from 'models/reputationLevels';
import { MassacreContext } from 'providers/massacreTrackerProvider';
import { useContext, useMemo } from 'react';
import { MassacreMissions } from './massacreMissions';
import { MassacreTotals } from './massacreTotals';
import { StationList } from './stationList';

const useStyles = makeStyles((theme) => ({
  systems: {
    display: 'flex',
    flexDirection: 'row',
    margin: theme.spacing(1),
  },
  buttons: {
    '& button': {
      margin: theme.spacing(1),
    },
  },
}));

export const MassacreTabPanel = (props: { system: string }) => {
  const { system } = props;
  const context = useContext(MassacreContext);
  const tracker = useMemo(() => {
    return context?.trackers.find((x) => x.hazRezSystem === system);
  }, [system, context?.trackers]);

  const classes = useStyles();

  if (context && tracker) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const deleteTracker = () => {
      const shouldDelete = window.confirm(
        `Do you really want to delete the ${tracker.hazRezSystem} tracker?`
      );
      if (shouldDelete === true) {
        context.deleteTracker(tracker);
      }
    };

    const addMissionColumn = () => {
      const newFactions = tracker.factions.map((faction) => {
        faction.missions = [
          ...faction.missions,
          { timeStamp: new Date(), killsforMission: 0, killsCompleted: 0 },
        ];
        return faction;
      });
      const newTracker: IMassacreTrack = { ...tracker, factions: newFactions };
      context.updateTracker(tracker.hazRezSystem, newTracker);
    };

    const deleteLastMissionColumn = () => {
      const newFactions = tracker.factions.map((faction) => {
        faction.missions = [
          ...faction.missions.slice(0, faction.missions.length - 1),
        ];
        return faction;
      });
      const newTracker: IMassacreTrack = { ...tracker, factions: newFactions };
      context.updateTracker(tracker.hazRezSystem, newTracker);
    };

    const displayAllFactions = () => {
      const newFactions = tracker.factions.map((faction) => {
        faction.removed = false;
        faction.missions = faction.missions.map((_) => {
          return null;
        });
        return faction;
      });
      const newTracker: IMassacreTrack = {
        ...tracker,
        factions: newFactions,
      };
      context.updateTracker(tracker.hazRezSystem, newTracker);
    };
    const resetCounts = () => {
      const newFactions = tracker.factions.map((faction) => {
        faction.missions = faction.missions.map((_) => {
          return null;
        });
        return faction;
      });
      const newTracker: IMassacreTrack = {
        ...tracker,
        factions: newFactions,
      };
      context.updateTracker(tracker.hazRezSystem, newTracker);
    };
    const refreshFactions = async () => {
      const result = await processHazRezSystem(tracker.hazRezSystem);
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

      context.updateTracker(tracker.hazRezSystem, final);
    };

    return (
      <Container maxWidth="xl">
        <div className={classes.buttons}>
          <Button onClick={deleteTracker} color="secondary" variant="contained">
            Delete Tracker
          </Button>
          <Button
            onClick={addMissionColumn}
            color="secondary"
            variant="contained"
          >
            Add Column to tracker
          </Button>
          <Button
            onClick={deleteLastMissionColumn}
            color="secondary"
            variant="contained"
          >
            Delete last column of tracker
          </Button>
          <Button
            onClick={displayAllFactions}
            color="secondary"
            variant="contained"
          >
            Unhide all factions
          </Button>
          <Button onClick={resetCounts} color="secondary" variant="contained">
            Reset Counts
          </Button>
          <Button
            onClick={refreshFactions}
            color="secondary"
            variant="contained"
          >
            Reset and Refresh Factions
          </Button>
        </div>
        <div>
          <MassacreTotals tracker={tracker} />
        </div>
        <div>
          <MassacreMissions
            tracker={tracker}
            updateTracker={context.updateTracker}
          />
        </div>
        <div>
          <MassacreTotals tracker={tracker} />
        </div>
        <div>
          <Typography variant="h4">Stations</Typography>
          <div className={classes.systems}>
            {tracker.systemsin10LY.map((system) => (
              <StationList
                key={system.name}
                system={system.name}
                stations={system.stations}
              />
            ))}
          </div>
        </div>
      </Container>
    );
  } else {
    return <Typography>Tracker not found</Typography>;
  }
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
        .filter((faction) => faction.influence > 0)
        .sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });

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
