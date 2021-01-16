import { AllRatings } from './ratings';

export type IShipUtilityMounts = [
  {
    class: number;
    rating: AllRatings;
    enabled: boolean;
    priority: number;
    /**
     * The group of the component, e.g. 'Shield Booster', or 'Kill Warrant Scanner'
     */
    group: string;
    /**
     * The name identifing the component (if applicable), e.g. 'Point Defence', or 'Electronic Countermeasure'
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
    /**
     * The group of the component, e.g. 'Shield Booster', or 'Kill Warrant Scanner'
     */
    group: string;
    /**
     * The name identifing the component (if applicable), e.g. 'Point Defence', or 'Electronic Countermeasure'
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
