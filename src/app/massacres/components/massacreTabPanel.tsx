import { PaperOutlineButton } from '@/components/_common/button';
import { IFactionwMissions, IMassacreTrack } from '@/app/massacres/massacreTrack';
import { processHazRezSystem } from '@/app/massacres/processHazRezSystem';
import { MassacreContext } from '@/app/massacres/providers/massacreTrackerProvider';
import { ReputationLevels } from '@/app/massacres/reputationLevels';
import { Box, Container, Typography } from '@mui/material';
import { useContext, useMemo } from 'react';
import { MassacreMissions } from './massacreMissions';
import { MassacreTotals } from './massacreTotals';
import { StationList } from './stationList';

export const MassacreTabPanel = (props: { system: string }) => {
  const { system } = props;
  const context = useContext(MassacreContext);
  const tracker = useMemo(() => {
    return context?.trackers.find((x) => x.hazRezSystem === system);
  }, [system, context?.trackers]);

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
        faction.missions = [...faction.missions.slice(0, faction.missions.length - 1)];
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
        <Box sx={{ '& button': { m: 1 } }}>
          <PaperOutlineButton onClick={deleteTracker} color="secondary" variant="outlined">
            Delete Tracker
          </PaperOutlineButton>
          <PaperOutlineButton onClick={addMissionColumn} color="secondary" variant="outlined">
            Add Column to tracker
          </PaperOutlineButton>
          <PaperOutlineButton
            onClick={deleteLastMissionColumn}
            color="secondary"
            variant="outlined">
            Delete last column of tracker
          </PaperOutlineButton>
          <PaperOutlineButton onClick={displayAllFactions} color="secondary" variant="outlined">
            Unhide all factions
          </PaperOutlineButton>
          <PaperOutlineButton onClick={resetCounts} color="secondary" variant="outlined">
            Reset Counts
          </PaperOutlineButton>
          <PaperOutlineButton onClick={refreshFactions} color="secondary" variant="outlined">
            Reset and Refresh Factions
          </PaperOutlineButton>
        </Box>
        <div>
          <MassacreTotals tracker={tracker} />
        </div>
        <div>
          <MassacreMissions tracker={tracker} updateTracker={context.updateTracker} />
        </div>
        <div>
          <MassacreTotals tracker={tracker} />
        </div>
        <div>
          <Typography variant="h4">Stations</Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              m: 1,
            }}>
            {tracker.systemsin10LY.map((system) => (
              <StationList key={system.name} system={system.name} stations={system.stations} />
            ))}
          </Box>
        </div>
      </Container>
    );
  } else {
    return <Typography>Tracker not found</Typography>;
  }
};
