import { IAlly } from '@/about/_models/ally';
import { getItems } from 'utils/db';

export const COLLECTION = 'allies';
export const getAllies = async () => {
  const items = await getItems<IAlly>(COLLECTION, 'name', 1);
  return items;
};
