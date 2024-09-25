import shipMap from '../_data/shipMap.json';
import { IShipInfo } from '../_models';

export const getShipInfofromID = (shipID: string): IShipInfo | undefined => {
  const ship: IShipInfo | undefined = shipMap.find((x) => x.shipId === shipID);
  return ship;
};
