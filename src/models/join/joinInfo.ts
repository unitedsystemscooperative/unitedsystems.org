export interface IJoinInfo {
  //   type: 'join' | 'guest' | 'ambassador';
  timeStamp?: string;
  type: string;
  cmdr: string;
  discord: string;
  platforms: {
    pc: boolean;
    xbox: boolean;
    ps: boolean;
  };
  //   playingLength?:
  //     | 'lessthanMonth'
  //     | 'morethanMonth'
  //     | 'morethan6Month'
  //     | 'morethanYear';
  playingLength?: string;
  reference?: string;
  reference2?: string;
  rules: boolean;
  timezone: string;
  needPrivate?: boolean;
  group?: string;
}
