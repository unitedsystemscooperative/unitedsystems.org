import { IBuildInfov2 } from '@/builds/_models';

export const testBuildNoExtra: IBuildInfov2 = {
  _id: '1234',
  shipId: 'imperial_clipper',
  title: 'clipper',
  specializations: [],
  buildLink: '',
  engLevel: 0,
  hasGuardian: false,
  hasPowerplay: false,
  isBeginner: false,
  author: 'author',
  related: [],
  description: 'description',
  jsonBuild: '',
};
export const testBuildExtraBuilds: IBuildInfov2 = {
  _id: '1234',
  shipId: 'imperial_clipper',
  title: 'clipper',
  specializations: [],
  buildLink: '',
  engLevel: 0,
  hasGuardian: false,
  hasPowerplay: false,
  isBeginner: false,
  author: 'author',
  related: ['1234'],
  description: 'description',
  jsonBuild: '',
};
