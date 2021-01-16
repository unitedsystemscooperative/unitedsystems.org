import StationTypes from 'data/stationTypes.json';

export const getStationSize = (stationType: string): string | undefined => {
  const size = StationTypes.find((x) => x.type === stationType)?.maxPadSize;
  return size;
};
