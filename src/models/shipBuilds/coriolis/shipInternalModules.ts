import { StandardRatings } from './ratings';

export type IShipInternalModules = [
  {
    class: number;
    rating: StandardRatings;
    enabled: boolean;
    priority: number;
    /**
     * The group of the component, e.g. 'Shield Generator', or 'Cargo Rack'
     */
    group: string;
    /**
     * The name identifying the component (if applicable), e.g. 'Advance Discovery Scanner', or 'Detailed Surface Scanner'
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
  {
    class: number;
    rating: StandardRatings;
    enabled: boolean;
    priority: number;
    /**
     * The group of the component, e.g. 'Shield Generator', or 'Cargo Rack'
     */
    group: string;
    /**
     * The name identifying the component (if applicable), e.g. 'Advance Discovery Scanner', or 'Detailed Surface Scanner'
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
  {
    class: number;
    rating: StandardRatings;
    enabled: boolean;
    priority: number;
    /**
     * The group of the component, e.g. 'Shield Generator', or 'Cargo Rack'
     */
    group: string;
    /**
     * The name identifying the component (if applicable), e.g. 'Advance Discovery Scanner', or 'Detailed Surface Scanner'
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
    rating: StandardRatings;
    enabled: boolean;
    priority: number;
    /**
     * The group of the component, e.g. 'Shield Generator', or 'Cargo Rack'
     */
    group: string;
    /**
     * The name identifying the component (if applicable), e.g. 'Advance Discovery Scanner', or 'Detailed Surface Scanner'
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
