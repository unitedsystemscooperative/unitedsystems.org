import { IShipCoreModules } from './shipCoreModules';
import { IShipInternalModules } from './shipInternalModules';
import { IShipHardpoints } from './shipHardpoints';
import { IShipUtilityMounts } from './shipUtilityMounts';

export interface IShipComponents {
  /**
   * The set of standard components across all ships
   */
  standard: IShipCoreModules;
  internal: IShipInternalModules;
  hardpoints: IShipHardpoints;
  utility: IShipUtilityMounts;
}
