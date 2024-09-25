import { IAlly } from '@/app/about/_models/ally';
import { getItems } from '@/utils/db';

const COLLECTION = 'allies';
export const getAllies = async () => {
  const items = await getItems<IAlly>(COLLECTION, 'name', 1);
  return items;
};
