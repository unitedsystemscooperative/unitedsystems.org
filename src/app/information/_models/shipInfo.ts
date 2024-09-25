import { ShipSize } from '@/app/builds/_models/shipSize';

export interface IShipInfo {
  id: number;
  name: string;
  size: ShipSize;
  requires?: string;
  shipImg: string;
}
