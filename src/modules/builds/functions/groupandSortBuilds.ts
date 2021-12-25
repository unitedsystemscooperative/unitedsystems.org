import { genericSortArray } from '@/functions/sort';
import shipMap from '@@/builds/data/shipMap.json';
import { IBuildInfov2, IShipInfo } from '@@/builds/models';

export const groupandSortBuilds = (builds: IBuildInfov2[]) => {
  const shipMapSorted: IShipInfo[] = genericSortArray(shipMap, { order: 'asc', orderBy: 'shipId' });

  let groupedBuilds: IBuildInfov2[] = [];

  for (const map of shipMapSorted) {
    const group = builds.filter((x) => x.shipId === map.shipId);
    const groupSorted = genericSortArray(group, { order: 'asc', orderBy: 'title' });
    groupedBuilds = [...groupedBuilds, ...groupSorted];
  }

  return groupedBuilds;
};
