import { ShipSize } from '../builds/shipSize';

export interface IShipInfo {
  id: number;
  name: string;
  size: ShipSize;
  requires?: string;
  shipImg: string;
}
