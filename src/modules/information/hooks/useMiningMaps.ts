import { genericSortArray } from '@/functions/sort';
import maps from '~/information/data/miningMaps.json';
import { IMiningMap } from '~/information/models/miningMap';

export const useMiningMaps = () => {
  const miningMaps: IMiningMap[] = maps;
  return genericSortArray(miningMaps, { orderBy: 'system', order: 'asc' });
};
