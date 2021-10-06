import { IDbItem } from 'models/dbItem';

export interface System extends IDbItem {
  name: string;
  inaraLink?: string;
  isControlled: boolean;
}
