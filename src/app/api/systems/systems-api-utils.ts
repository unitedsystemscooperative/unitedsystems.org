import { System } from '@/about/_models/system';
import { getItems } from 'utils/db';

export const COLLECTION = 'systems';
export const getSystems = async () => {
  const items = await getItems<System>(COLLECTION, 'name', 1);
  return items;
};
