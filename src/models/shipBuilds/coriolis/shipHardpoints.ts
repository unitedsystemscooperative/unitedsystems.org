import { AllRatings } from './ratings';

export type IShipHardpoints = [
  {
    class: number;
    rating: AllRatings;
    enabled: boolean;
    priority: number;
    mount: 'Fixed' | 'Gimballed' | 'Turret';
    /**
     * The group of the component, e.g. 'Beam Laser', or 'Missile Rack'
     */
    group: string;
    /**
     * The name identifing the component (if applicable), e.g. 'Retributor', or 'Mining Lance'
     */
    name?: string;
    blueprint?: {
      [k: string]: unknown;
    };
    modifications?: {
      [k: string]: unknown;
    };
    [k: string]: unknown;
  } | null,
  ...({
    class: number;
    rating: AllRatings;
    enabled: boolean;
    priority: number;
    mount: 'Fixed' | 'Gimballed' | 'Turret';
    /**
     * The group of the component, e.g. 'Beam Laser', or 'Missile Rack'
     */
    group: string;
    /**
     * The name identifing the component (if applicable), e.g. 'Retributor', or 'Mining Lance'
     */
    name?: string;
    blueprint?: {
      [k: string]: unknown;
    };
    modifications?: {
      [k: string]: unknown;
    };
    [k: string]: unknown;
  } | null)[]
];
