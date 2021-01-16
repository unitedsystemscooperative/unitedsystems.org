import Ships from 'data/builds/shipMap.json';
import { IShipInfo } from 'models/builds';

export const useShipMap = () => {
  const ships: IShipInfo[] = Ships;
  return ships;
};

export const useShipIdfromMap = (shipId?: string) => {
  if (shipId) {
    const ships: IShipInfo[] = Ships;
    const ship = ships.find((x) => x.shipId === shipId);
    return ship;
  }
  return undefined;
};
