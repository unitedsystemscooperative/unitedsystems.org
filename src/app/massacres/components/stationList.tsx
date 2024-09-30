import { getStationSize } from '@/modules/edsmQueries/functions';
import { Box, Divider, Paper, Typography } from '@mui/material';

export const StationList = (props: {
  system: string;
  stations: { type: string; name: string; distance: number }[];
}) => {
  const { system, stations } = props;
  return (
    <Box maxWidth="xs" m={1}>
      <Typography variant="h5" m={1}>
        {system}
      </Typography>
      <Paper sx={{ width: 200, p: 1, mx: 'auto' }}>
        {stations.map((station) => (
          <div key={station.name}>
            <div style={{ display: 'flex' }}>
              <Typography>{station.name}</Typography>
              <div style={{ flexGrow: 1 }} />
              <Typography>{getStationSize(station.type)?.slice(undefined, 1)}</Typography>
            </div>
            <Typography>{station.distance} ls</Typography>
            <Divider />
          </div>
        ))}
      </Paper>
    </Box>
  );
};
