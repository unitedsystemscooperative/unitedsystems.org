import { genericSortArray } from '@/functions/sort';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Container,
  IconButton,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';
import { useSnackbar } from 'notistack';
import { ChangeEvent, useEffect, useState } from 'react';
import { IFactionMission, IFactionwMissions, IMassacreTrack } from '~/massacre/massacreTrack';

interface IMassacreMissions {
  tracker: IMassacreTrack;
  updateTracker: (hazRezSystem: string, newTracker: IMassacreTrack) => void;
}

export const MassacreMissionTable = ({ tracker, updateTracker }: IMassacreMissions) => {
  const handleFactionChange = (faction: IFactionwMissions) => {
    const index = tracker.factions.findIndex((f) => f.id === faction.id);
    const factions = tracker.factions;
    factions[index] = faction;
    const newTracker: IMassacreTrack = { ...tracker, factions };
    updateTracker(tracker.hazRezSystem, newTracker);
  };

  return (
    <Container maxWidth="xl">
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>Faction</TableCell>
              <TableCell>Reputation</TableCell>
              {tracker.factions[0].missions.map((_, index) => (
                <TableCell key={index}>Mission {index + 1}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {genericSortArray(tracker.factions, { order: 'asc', orderBy: 'name' }).map((faction) =>
              faction.removed ? null : (
                <FactionRow
                  key={faction.name}
                  faction={faction}
                  onFactionChange={handleFactionChange}
                />
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

const StyledTableRow = withStyles((theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const processMissions = (faction: IFactionwMissions) => {
  const missions = faction.missions.map((mission) => {
    if (mission === null) {
      const newMission: IFactionMission = {
        timeStamp: new Date(),
        killsforMission: 0,
        killsCompleted: 0,
      };
      return newMission;
    } else {
      return mission;
    }
  });
  return missions;
};
const reduceTotalKills = (acc: number, current: IFactionMission) => {
  return acc + current.killsforMission;
};

const FactionRow = (props: {
  faction: IFactionwMissions;
  onFactionChange: (faction: IFactionwMissions) => void;
}) => {
  const { faction, onFactionChange } = props;
  const { enqueueSnackbar } = useSnackbar();

  const [totalKills, setTotalKills] = useState(0);
  const [missionKills, setMissionKills] = useState<Array<IFactionMission>>(() => {
    const newMissions = processMissions(faction);
    const totalKillsNeeded: number = newMissions.reduce(reduceTotalKills, 0);
    setTotalKills(totalKillsNeeded);
    return newMissions;
  });

  useEffect(() => {
    const newMissions = processMissions(faction);
    const totalKillsNeeded: number = newMissions.reduce(reduceTotalKills, 0);
    setMissionKills(newMissions);
    setTotalKills(totalKillsNeeded);
  }, [faction, faction.missions]);

  const handleKillsforMissionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const stringTitle = event.target.name;
    const stringValue = event.target.value;

    let numberValue = 0;
    if (stringValue !== '') {
      numberValue = parseInt(stringValue);
    }
    if (isNaN(numberValue)) {
      enqueueSnackbar('A value entered is not a number', {
        variant: 'warning',
      });
      return;
    }
    const killIndex = parseInt(stringTitle);
    setMissionKills((previous) => {
      previous[killIndex] = {
        ...previous[killIndex],
        killsforMission: numberValue,
      };
      const totalKillsNeeded: number = previous.reduce((acc: number, current: IFactionMission) => {
        return acc + current.killsforMission;
      }, 0);
      setTotalKills(totalKillsNeeded);
      onFactionChange({ ...faction, missions: previous });
      return previous;
    });
  };

  const removeFaction = () => {
    const emptyMissions: IFactionMission[] = faction.missions.map(() => {
      return { timeStamp: new Date(), killsforMission: 0, killsCompleted: 0 };
    });
    setMissionKills(emptyMissions);
    setTotalKills(0);

    const newFaction: IFactionwMissions = {
      ...faction,
      missions: emptyMissions,
      removed: true,
    };
    onFactionChange(newFaction);
  };

  return (
    <StyledTableRow>
      <TableCell data-testid={`faction-totalKills-${faction.name.toLowerCase()}`}>
        {totalKills}
      </TableCell>
      <TableCell>
        {faction.name}
        <IconButton
          onClick={removeFaction}
          size="large"
          data-testid={`faction-delete-${faction.name.toLowerCase()}`}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
      <TableCell data-testid={`faction-rep-${faction.name.toLowerCase()}`}>
        {faction.reputation}
      </TableCell>
      {missionKills.map((mission, index) => (
        <SizedTableCell key={index}>
          <TextField
            value={mission.killsforMission}
            onChange={handleKillsforMissionChange}
            name={index.toString()}
            data-testid={`faction-mission-${index}-${faction.name.toLowerCase()}`}
          />
        </SizedTableCell>
      ))}
    </StyledTableRow>
  );
};

const SizedTableCell = styled(TableCell)(() => ({
  maxWidth: 75,
}));
