import { IMiningMap } from 'models/information/miningMap';
import maps from 'data/information/miningMaps.json';
import { genericSortArray } from 'functions/sort';

export const useMiningMaps = () => {
  const miningMaps: IMiningMap[] = maps;
  return genericSortArray(miningMaps, { orderBy: 'system', order: 'asc' });
};
