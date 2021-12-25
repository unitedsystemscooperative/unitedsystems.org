import { ShipSize } from './shipSize';

export interface IShipInfo {
  /** id of the ship. Used to determine other info */
  shipId: string;
  name: string;
  size: ShipSize;
  requires?: string;
  shipImg: string;
  shipReview: string;
  blueprint: string;
}
