import { Divider, makeStyles, Paper, Typography } from '@material-ui/core';
import { getStationSize } from 'functions/getStationSize';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  paper: {
    width: 200,
    padding: theme.spacing(1),
  },
  flex: {
    display: 'flex',
  },
  spacer: {
    flexGrow: 1,
  },
}));

export const StationList = (props: {
  system: string;
  stations: { type: string; name: string; distance: number }[];
}) => {
  const { system, stations } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.paper}>
        {system}
      </Typography>
      <Paper className={classes.paper}>
        {stations.map((station) => (
          <div key={station.name}>
            <div className={classes.flex}>
              <Typography>{station.name}</Typography>
              <div className={classes.spacer} />
              <Typography>
                {getStationSize(station.type)?.slice(undefined, 1)}
              </Typography>
            </div>
            <Typography>{station.distance} ls</Typography>
            <Divider />
          </div>
        ))}
      </Paper>
    </div>
  );
};
