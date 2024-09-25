import { IBuildInfov2 } from '@/app/builds/_models';
import { getItems } from '@/utils/db';

const COLLECTION = 'shipBuildsv2';
export const getBuilds = async () => {
  const items = await getItems<IBuildInfov2>(COLLECTION, 'shipId', 1);
  console.log({ items });
  return items;
};
