import { IDbItem } from 'models/dbItem';
import { Platform } from './platforms';
import { Rank } from './ranks';
import { Referral } from './referrals';
import { Region } from './regions';

export interface ICMDR extends IDbItem {
  cmdrName: string;
  discordName: string;
  discordJoinDate: Date;
  platform: Platform;
  rank: Rank;
  inaraLink?: string;
  region: Region;
  notes?: string;
  email?: string;
  isDeleted?: boolean;
}

export interface IMember extends ICMDR {
  joinDate: Date;
  promotion?: Rank;
  isInInaraSquad: boolean;
  ref1: Referral;
  ref2?: string;
  entersVoice: boolean;
}

export interface IGuest extends ICMDR {
  ref1: Referral;
  ref2?: string;
}

export interface IAmbassador extends ICMDR {
  groupRepresented: string;
  isCoalition: boolean;
}
