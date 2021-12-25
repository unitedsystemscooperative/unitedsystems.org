import { IDbItem } from '@/models/dbItem';
import { Platform } from './platforms';
import { Rank } from './ranks';
import { Referral } from './referrals';
import { Region } from './regions';

export interface ICMDR extends IDbItem {
  cmdrName: string;
  discordName: string;
  discordJoinDate: Date | string;
  platform: Platform;
  rank: Rank;
  rankString?: string;
  inaraLink?: string;
  region: Region;
  notes?: string;
  email?: string;
  isDeleted?: boolean;
}

export interface IMember extends ICMDR {
  joinDate: Date | string;
  promotion?: Rank | null;
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

export interface ICMDRs {
  members: IMember[];
  guests: IGuest[];
  ambassadors: IAmbassador[];
}
