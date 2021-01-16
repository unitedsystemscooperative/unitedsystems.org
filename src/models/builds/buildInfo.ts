import { ObjectId } from 'bson';

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

export interface IBuildInfov2 {
  _id: ObjectId | { $oid: string };
  shipId: string;
  title: string;
  specializations: string[];
  buildLink: string;
  engLevel: number;
  hasGuardian: boolean;
  hasPowerplay: boolean;
  isBeginner: boolean;
  author: string;
  isVariant: boolean;
  variants: string[];
  related: string[];
  description: string;
  jsonBuild: string;
}
