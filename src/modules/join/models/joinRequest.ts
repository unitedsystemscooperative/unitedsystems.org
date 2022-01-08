import { IDbItem } from '@/models/dbItem';
import { Platform, Referral, Region } from '~/admin/models';

export interface IJoinRequest extends IDbItem {
  //   type: 'join' | 'guest' | 'ambassador';
  timeStamp?: Date | string;
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
