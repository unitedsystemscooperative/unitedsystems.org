import shipMap from 'data/shipBuilds/shipMap.json';
import { IShipInfo } from 'models/shipBuilds/shipInfo';

export const getShipInfofromID = (shipID: string): IShipInfo | undefined => {
  const ship: IShipInfo | undefined = shipMap.find((x) => x.shipId === shipID);
  return ship;
};
export const getShipInfofromName = (
  shipName: string
): IShipInfo | undefined => {
  const ship: IShipInfo | undefined = shipMap.find(
    (x) => x.name.toLowerCase() === shipName.toLowerCase()
  );
  return ship;
};
