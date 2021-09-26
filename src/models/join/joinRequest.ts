import { Platform } from 'models/admin/platforms';
import { Referral } from 'models/admin/referrals';
import { Region } from 'models/admin/regions';
import { IDbItem } from 'models/dbItem';

export interface IJoinRequest extends IDbItem {
  //   type: 'join' | 'guest' | 'ambassador';
  timeStamp?: string;
  type: string;
  cmdr: string;
  discord: string;
  platform: Platform;
  //   playingLength?:
  //     | 'lessthanMonth'
  //     | 'morethanMonth'
  //     | 'morethan6Month'
  //     | 'morethanYear';
  playingLength?: string;
  referral?: Referral;
  referral2?: string;
  rules: boolean;
  timezone?: string;
  region?: Region;
  needPrivate?: boolean;
  group?: string;
}
