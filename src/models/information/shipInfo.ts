import { ShipSize } from '../shipBuilds/shipSize';

export interface IShipInfo {
  id: number;
  name: string;
  size: ShipSize;
  requires?: string;
  shipImg: string;
}
