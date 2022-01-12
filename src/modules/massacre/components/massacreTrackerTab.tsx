import { PaperOutlineButton } from '@/components/_common/button';
import { Box, Container, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useContext, useMemo } from 'react';
import { IMassacreTrack } from '~/massacre/massacreTrack';
import { processHazRezSystem } from '~/massacre/processHazRezSystem';
import { MassacreContext } from '~/massacre/providers/massacreTrackerProvider';
import { MassacreMissionTable } from './massacreMissionTable';
import { MassacreSummary } from './massacreSummary';
import { StationList } from './stationList';

export const MassacreTrackerTab = ({ system }: { system: string }) => {
  const context = useContext(MassacreContext);
  const { enqueueSnackbar } = useSnackbar();
  const tracker = useMemo(() => {
    return context?.trackers.find((x) => x.hazRezSystem === system);
  }, [system, context?.trackers]);

  if (context && tracker) {
    const deleteTracker = () => {
      const shouldDelete = window.confirm(
        `Do you really want to delete the ${tracker.hazRezSystem} tracker?`
      );
      if (shouldDelete === true) {
        context.deleteTracker(tracker);
      }
    };

    const addMissionColumn = () => {
      if (tracker.factions.some((x) => x.missions.length < 20)) {
        const newFactions = tracker.factions.map((faction) => {
          faction.missions = [
            ...faction.missions,
            { timeStamp: new Date(), killsforMission: 0, killsCompleted: 0 },
          ];
          return faction;
        });
        const newTracker: IMassacreTrack = { ...tracker, factions: newFactions };
        context.updateTracker(tracker.hazRezSystem, newTracker);
      } else {
        enqueueSnackbar('Maximum number of mission columns (20) reached.', { variant: 'warning' });
      }
    };

    const deleteLastMissionColumn = () => {
      if (tracker.factions.some((x) => x.missions.length > 1)) {
        const newFactions = tracker.factions.map((faction) => {
          faction.missions = [...faction.missions.slice(0, faction.missions.length - 1)];
          return faction;
        });
        const newTracker: IMassacreTrack = { ...tracker, factions: newFactions };
        context.updateTracker(tracker.hazRezSystem, newTracker);
      } else {
        enqueueSnackbar('Minimum number of mission columns (1) reached', { variant: 'warning' });
      }
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
      context.updateTracker(tracker.hazRezSystem, result);
    };

    return (
      <Container maxWidth="xl">
        <Box sx={{ '& button': { m: 1 } }} data-testid="tracker-function-buttons">
          <PaperOutlineButton
            onClick={deleteTracker}
            color="secondary"
            variant="outlined"
            data-testid="tracker-delete">
            Delete Tracker
          </PaperOutlineButton>
          <PaperOutlineButton
            onClick={addMissionColumn}
            color="secondary"
            variant="outlined"
            data-testid="tracker-add-column">
            Add Column to tracker
          </PaperOutlineButton>
          <PaperOutlineButton
            onClick={deleteLastMissionColumn}
            color="secondary"
            variant="outlined"
            data-testid="tracker-delete-column">
            Delete last column of tracker
          </PaperOutlineButton>
          <PaperOutlineButton
            onClick={displayAllFactions}
            color="secondary"
            variant="outlined"
            data-testid="tracker-unhide-factions">
            Unhide all factions
          </PaperOutlineButton>
          <PaperOutlineButton
            onClick={resetCounts}
            color="secondary"
            variant="outlined"
            data-testid="tracker-reset-counts">
            Reset Counts
          </PaperOutlineButton>
          <PaperOutlineButton
            onClick={refreshFactions}
            color="secondary"
            variant="outlined"
            data-testid="tracker-reset-factions">
            Reset and Refresh Factions
          </PaperOutlineButton>
        </Box>
        <div>
          <MassacreSummary tracker={tracker} />
        </div>
        <div>
          <MassacreMissionTable tracker={tracker} updateTracker={context.updateTracker} />
        </div>
        <div>
          <MassacreSummary tracker={tracker} />
        </div>
        <div>
          <Typography variant="h4">Stations</Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
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
