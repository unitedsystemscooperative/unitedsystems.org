import Ships from '@@/builds/data/shipMap.json';
import { IShipInfo } from '@@/builds/models';

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
