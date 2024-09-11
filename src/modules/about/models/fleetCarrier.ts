import { WithStringId } from '@/utils/db';

interface FleetCarrier {
  owner: string;
  name: string;
  id: string;
  inaraLink?: string;
  purpose: string;
}

export type IFleetCarrier = WithStringId<FleetCarrier>;
