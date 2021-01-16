import { IMiningMap } from 'models/information/miningMap';
import maps from 'data/information/miningMaps.json';
import { sortItems } from 'functions/sort';

export const useMiningMaps = () => {
  const miningMaps: IMiningMap[] = maps;
  return sortItems(miningMaps, 'system');
};
