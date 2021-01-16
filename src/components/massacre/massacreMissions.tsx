import {
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import {
  IFactionMission,
  IFactionwMissions,
  IMassacreTrack,
} from 'models/massacreTrack';
import { useSnackbar } from 'notistack';
import { ChangeEvent, useEffect, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

export const MassacreMissions = (props: {
  tracker: IMassacreTrack;
  updateTracker: (hazRezSystem: string, newTracker: IMassacreTrack) => void;
}) => {
  const { tracker, updateTracker } = props;

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
            {tracker.factions.map((faction) =>
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

const FactionRow = (props: {
  faction: IFactionwMissions;
  onFactionChange: (faction: IFactionwMissions) => void;
}) => {
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

  const { faction, onFactionChange } = props;
  const { enqueueSnackbar } = useSnackbar();

  const [totalKills, setTotalKills] = useState(0);
  const [missionKills, setMissionKills] = useState<Array<IFactionMission>>(
    () => {
      const newMissions = processMissions(faction);
      const totalKillsNeeded: number = newMissions.reduce(reduceTotalKills, 0);
      setTotalKills(totalKillsNeeded);
      return newMissions;
    }
  );

  useEffect(() => {
    const newMissions = processMissions(faction);
    const totalKillsNeeded: number = newMissions.reduce(reduceTotalKills, 0);
    setMissionKills(newMissions);
    setTotalKills(totalKillsNeeded);
  }, [faction, faction.missions]);

  const handleKillsforMissionChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
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
    console.log({ killIndex, numberValue });
    setMissionKills((previous) => {
      previous[killIndex] = {
        ...previous[killIndex],
        killsforMission: numberValue,
      };
      const totalKillsNeeded: number = previous.reduce(
        (acc: number, current: IFactionMission) => {
          return acc + current.killsforMission;
        },
        0
      );
      setTotalKills(totalKillsNeeded);
      onFactionChange({ ...faction, missions: previous });
      return previous;
    });
  };

  const removeFaction = () => {
    const emptyMissions: IFactionMission[] = faction.missions.map((mission) => {
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
    <TableRow>
      <TableCell>{totalKills}</TableCell>
      <TableCell>
        {faction.name}{' '}
        <IconButton onClick={removeFaction}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
      <TableCell>{faction.reputation}</TableCell>
      {missionKills.map((mission, index) => (
        <TableCell key={index}>
          <TextField
            value={mission.killsforMission}
            onChange={handleKillsforMissionChange}
            name={index.toString()}
          />
        </TableCell>
      ))}
    </TableRow>
  );
};
