import { IBuildInfov2 } from '@/builds/_models';
import { getItems, getItemsByQuery } from 'utils/db';

const COLLECTION = 'shipBuildsv2';
export const getBuilds = async () => {
  const items = await getItems<IBuildInfov2>(COLLECTION, 'shipId', 1);
  // console.log({ items });
  return items;
};

export const getBuildById = async (id: string) => {
  const items = await getItemsByQuery<IBuildInfov2>(COLLECTION, { _id: id });

  if (items.length > 0) {
    return items[0];
  } else {
    return undefined;
  }
};
