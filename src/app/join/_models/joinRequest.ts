import { WithStringId } from 'utils/db';
import { Platform, Referral, Region } from '@/admin/_models';

interface JoinRequest {
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

export type IJoinRequest = WithStringId<JoinRequest>;
