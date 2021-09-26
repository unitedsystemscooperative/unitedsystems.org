import { Divider, Paper, Typography } from '@mui/material';
import { BoxwMB1 } from 'components/_common';
import { getStationSize } from 'functions/edsmQueries/getStationSize';

export const StationList = (props: {
  system: string;
  stations: { type: string; name: string; distance: number }[];
}) => {
  const { system, stations } = props;
  return (
    <BoxwMB1>
      <Typography variant="h5" m={1}>
        {system}
      </Typography>
      <Paper sx={{ width: 200, p: 1 }}>
        {stations.map((station) => (
          <div key={station.name}>
            <div style={{ display: 'flex' }}>
              <Typography>{station.name}</Typography>
              <div style={{ flexGrow: 1 }} />
              <Typography>
                {getStationSize(station.type)?.slice(undefined, 1)}
              </Typography>
            </div>
            <Typography>{station.distance} ls</Typography>
            <Divider />
          </div>
        ))}
      </Paper>
    </BoxwMB1>
  );
};
