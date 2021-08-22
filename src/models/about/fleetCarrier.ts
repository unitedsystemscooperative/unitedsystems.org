import { IDbItem } from 'models/dbItem';

export interface IFleetCarrier extends IDbItem {
  owner: string;
  name: string;
  id: string;
  inaraLink: string;
  purpose: string;
}
