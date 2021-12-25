import { StandardRatings } from './ratings';

export interface IShipCoreModules {
  bulkheads:
    | 'Lightweight Alloy'
    | 'Reinforced Alloy'
    | 'Military Grade Composite'
    | 'Mirrored Surface Composite'
    | 'Reactive Surface Composite';
  cargoHatch: {
    enabled: boolean;
    priority: number;
    [k: string]: unknown;
  };
  powerPlant: {
    class: number;
    rating: StandardRatings;
    enabled: boolean;
    priority: number;
    blueprint?: {
      [k: string]: unknown;
    };
    modifications?: {
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  thrusters: {
    class: number;
    rating: StandardRatings;
    enabled: boolean;
    priority: number;
    /**
     * The name identifing the thrusters (if applicable), e.g. 'Enhanced Performance'
     */
    name?: string;
    blueprint?: {
      [k: string]: unknown;
    };
    modifications?: {
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  frameShiftDrive: {
    class: number;
    rating: StandardRatings;
    enabled: boolean;
    priority: number;
    blueprint?: {
      [k: string]: unknown;
    };
    modifications?: {
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  lifeSupport: {
    class: number;
    rating: StandardRatings;
    enabled: boolean;
    priority: number;
    blueprint?: {
      [k: string]: unknown;
    };
    modifications?: {
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  powerDistributor: {
    class: number;
    rating: StandardRatings;
    enabled: boolean;
    priority: number;
    blueprint?: {
      [k: string]: unknown;
    };
    modifications?: {
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  sensors: {
    class: number;
    rating: StandardRatings;
    enabled: boolean;
    priority: number;
    blueprint?: {
      [k: string]: unknown;
    };
    modifications?: {
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  fuelTank: {
    class: number;
    rating: StandardRatings;
    enabled: boolean;
    priority: number;
    blueprint?: {
      [k: string]: unknown;
    };
    modifications?: {
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
}
