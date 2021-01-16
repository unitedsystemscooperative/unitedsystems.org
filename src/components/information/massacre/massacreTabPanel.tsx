import { Button, Container, makeStyles, Typography } from '@material-ui/core';
import { IMassacreTrack } from 'models/massacreTrack';
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

    return (
      <Container maxWidth="xl">
        <div className={classes.buttons}>
          {/* <Button onClick={deleteTracker} color="secondary" variant="contained">
            Delete Tracker
          </Button> */}
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
