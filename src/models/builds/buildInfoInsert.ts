import { ObjectId } from 'bson';

export interface IBuildInfoInsert {
  _id: ObjectId;
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
