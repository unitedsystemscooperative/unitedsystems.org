// export interface IBuildInfo {
//   _id: ObjectId;
//   ship?: number;
//   size?: number | ShipSize;
//   author: string;
//   specializations: string[];
//   engLevel: number;
//   description: string;
//   buildLink: string;
//   guardian: boolean;
//   powerplay: boolean;
//   beginner: boolean;
//   moreInfo?: string;
// }

import { WithStringId } from 'utils/db';

interface BuildInfov2 {
  shipId: string;
  title: string;
  specializations: string[];
  buildLink: string;
  engLevel: number;
  hasGuardian: boolean;
  hasPowerplay: boolean;
  isBeginner: boolean;
  author: string;
  authorId?: string;
  related: string[];
  description: string;
  jsonBuild: string;
}

export type IBuildInfov2 = WithStringId<BuildInfov2>;
