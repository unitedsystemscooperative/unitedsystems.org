import { Container, makeStyles, Paper, Typography } from '@material-ui/core';
import {
  IFactionMission,
  IFactionwMissions,
  IMassacreTrack,
} from 'models/massacreTrack';
import RepCalculation from 'data/information/massacre/massacreKillValues.json';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  center: { textAlign: 'center' },
}));

const calcTotalKillsNeeded = (tracker: IMassacreTrack) => {
  return tracker.factions.reduce<number>(
    (acc: number, faction: IFactionwMissions) => {
      if (faction.missions && faction.missions.length > 0) {
        const missionKillsNeeded = faction.missions.reduce<number>(
          (acc2: number, mission: IFactionMission | null) => {
            if (mission) {
              return acc2 + mission.killsforMission;
            }
            return acc2;
          },
          0
        );
        return acc + missionKillsNeeded;
      }
      return acc;
    },
    0
  );
};

const calcTotalMissions = (tracker: IMassacreTrack) => {
  return tracker.factions.reduce<number>((acc, faction) => {
    if (faction.missions && faction.missions.length > 0) {
      const missionCount = faction.missions.reduce<number>((acc2, mission) => {
        if (mission && mission.killsforMission > 0) {
          return acc2 + 1;
        }
        return acc2;
      }, 0);
      return acc + missionCount;
    }
    return acc;
  }, 0);
};

const calcPayout = (tracker: IMassacreTrack) => {
  const payout = tracker.factions.reduce<number>((acc, faction) => {
    const repValue = RepCalculation.find(
      (x) => x.key.toLowerCase() === faction.reputation.toLowerCase()
    )?.value;
    if (repValue) {
      if (faction.missions && faction.missions.length > 0) {
        const missionPayout = faction.missions.reduce<number>(
          (acc2, mission) => {
            if (mission && mission.killsforMission > 0) {
              return acc2 + repValue * mission.killsforMission;
            }
            return acc2;
          },
          0
        );
        return acc + missionPayout;
      }
    }
    return acc;
  }, 0);
  return +payout.toFixed(2);
};

export const MassacreTotals = (props: { tracker: IMassacreTrack }) => {
  const { tracker } = props;
  const classes = useStyles();
  const [totalMissions, setTotalMissions] = useState(0);
  const [totalKillsNeeded, setTotalKillsNeeded] = useState(0);
  const [payout, setPayout] = useState(0);

  useEffect(() => {
    const totalMissionCount = calcTotalMissions(tracker);
    setTotalMissions(totalMissionCount);
    const totalKillsNeeded = calcTotalKillsNeeded(tracker);
    setTotalKillsNeeded(totalKillsNeeded);
    const payout = calcPayout(tracker);
    setPayout(payout);
  }, [tracker]);

  return (
    <Container maxWidth="xs">
      <Paper className={classes.center}>
        <Typography>Total Missions: {totalMissions}</Typography>
        <Typography>Total Kills Needed: {totalKillsNeeded}</Typography>
        <Typography>
          Approx Payout based on set Rep: {payout} million
        </Typography>
      </Paper>
    </Container>
  );
};
