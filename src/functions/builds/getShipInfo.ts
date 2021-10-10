import shipMap from 'data/builds/shipMap.json';
import { IShipInfo } from 'models/builds/shipInfo';

export const getShipInfofromID = (shipID: string): IShipInfo | undefined => {
  const ship: IShipInfo | undefined = shipMap.find((x) => x.shipId === shipID);
  return ship;
};
