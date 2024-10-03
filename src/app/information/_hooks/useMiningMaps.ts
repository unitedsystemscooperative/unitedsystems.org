import { genericSortArray } from 'functions/sort';
import maps from '../_data/miningMaps.json';
import { IMiningMap } from '../_models/miningMap';

export const useMiningMaps = () => {
  const miningMaps: IMiningMap[] = maps;
  return genericSortArray(miningMaps, { orderBy: 'system', order: 'asc' });
};
