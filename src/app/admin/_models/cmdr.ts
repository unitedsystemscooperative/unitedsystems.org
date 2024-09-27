import { WithStringId } from '@/utils/db';
import { Platform } from './platforms';
import { Rank } from './ranks';
import { Referral } from './referrals';
import { Region } from './regions';

interface CMDR {
  cmdrName: string;
  discordName: string;
  discordJoinDate: Date;
  platform: Platform;
  rank: Rank;
  rankString?: string;
  inaraLink?: string;
  region: Region;
  notes?: string;
  email?: string;
  isDeleted?: boolean;
}

export type ICMDR = WithStringId<CMDR>;

export interface IMember extends WithStringId<ICMDR> {
  joinDate: Date;
  promotion?: Rank | null;
  isInInaraSquad: boolean;
  ref1: Referral;
  ref2?: string;
  entersVoice: boolean;
}

export interface IGuest extends WithStringId<ICMDR> {
  ref1: Referral;
  ref2?: string;
}

export interface IAmbassador extends WithStringId<ICMDR> {
  groupRepresented: string;
  isCoalition: boolean;
}

export interface ICMDRs {
  members: IMember[];
  guests: IGuest[];
  ambassadors: IAmbassador[];
}
