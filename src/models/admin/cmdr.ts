import { Platform } from './platforms';
import { Rank } from './ranks';
import { Referral } from './referrals';
import { Region } from './regions';

export interface ICMDR {
  _id: string;
  cmdrName: string;
  discordName: string;
  joinDate: Date;
  discordJoinDate: Date;
  platform: Platform;
  rank: Rank;
  promotion?: Rank;
  isInInaraSquad: boolean;
  inaraLink?: string;
  region: Region;
  ref1: Referral;
  ref2?: string;
  notes?: string;
  entersVoice: boolean;
  email?: string;
  isDeleted?: boolean;
}
