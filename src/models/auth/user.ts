import { Rank } from '../../modules/admin/models/ranks';

export interface IUser {
  _id: string;
  cmdr: string;
  email: string;
  role: 'member' | 'high command';
  rank?: Rank;
}
