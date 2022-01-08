import shipMap from '~/builds/data/shipMap.json';
import { IShipInfo } from '~/builds/models';

export const getShipInfofromID = (shipID: string): IShipInfo | undefined => {
  const ship: IShipInfo | undefined = shipMap.find((x) => x.shipId === shipID);
  return ship;
};
