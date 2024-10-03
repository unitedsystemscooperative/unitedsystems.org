import { IFleetCarrier } from '@/about/_models/fleetCarrier';
import { getItems } from 'utils/db';

export const COLLECTION = 'fleetCarriers';
export const getFCs = async () => {
  const items = await getItems<IFleetCarrier>(COLLECTION, 'name', 1);
  return items;
};
