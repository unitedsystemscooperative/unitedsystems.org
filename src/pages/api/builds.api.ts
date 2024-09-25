import { connectToDatabase } from '@/lib/db';
import {
  deleteItem,
  getItems,
  getItemsByQuery,
  insertItem,
  updateItem,
  WithStringId,
} from '@/utils/db';
import { getIsHC } from '@/utils/get-isHC';
import { getUserId } from '@/utils/get-userId';
import { IBuildInfov2 } from '@/app/builds/_models';
import { Filter, WithId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const COLLECTION = 'shipBuildsv2';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const isHC = await getIsHC(req);
    const userId = await getUserId(req);

    const build: IBuildInfov2 = req.body;
    const updateBuild: WithStringId<Partial<IBuildInfov2>> = req.body;

    switch (req.method) {
      case 'POST':
        const newBuild: IBuildInfov2 = { ...build };
        if (userId) {
          newBuild.authorId = userId;
        }
        const insertedId = await insertItem(COLLECTION, newBuild);
        await processOtherBuilds({ ...newBuild, _id: insertedId });

        res.status(200).end();
        break;
      case 'PUT':
        if (updateBuild.title) {
          const authorId = (updateBuild.authorId as string) ?? '';
          if (authorId !== userId && !isHC) {
            res.status(401).send('unauthorized');
            return;
          }
        }

        const db = await connectToDatabase();

        const oldBuild = await db
          .collection<WithId<IBuildInfov2>>(COLLECTION)
          .findOne({ _id: updateBuild._id });

        const updateResult = await updateItem(COLLECTION, updateBuild);
        await processOtherBuilds(updateBuild, oldBuild);

        if (updateResult) res.status(200).end();
        else res.status(500).send(`Failed to update id: ${req.body._id}`);

        break;
      case 'DELETE':
        const authorId = req.query['authorId'] as string;
        if (authorId !== userId && !isHC) {
          res.status(401).send('unauthorized');
          return;
        }

        const buildId = req.query['id'] as string;
        const buildQuery: Filter<IBuildInfov2> = { related: { $in: [buildId] } };

        const builds = await getItemsByQuery<IBuildInfov2>(COLLECTION, buildQuery);

        await deleteItem(COLLECTION, req.query['id'] as string);
        for (const b of builds) {
          if (b.related.includes(buildId)) {
            // remove specific item from related
            const newRelated = [
              ...b.related.slice(0, b.related.indexOf(buildId)),
              ...b.related.slice(b.related.indexOf(buildId) + 1),
            ];
            await updateItem<IBuildInfov2>(COLLECTION, { ...b, related: newRelated });
          }
        }
        res.status(200).end();
        break;
      case 'GET':
      default:
        const result = await getBuilds();

        res.status(200).send(result);
        break;
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
};

export const getBuilds = async () => {
  const items = await getItems<IBuildInfov2>(COLLECTION, 'shipId', 1);
  console.log({ items });
  return items;
};

/**
 * Verifies that other builds have the proper information such as VariantOf, Related, and Variant.
 * @param newBuild
 * @param db
 */
const processOtherBuilds = async (
  newBuild: IBuildInfov2 | Partial<IBuildInfov2>,
  oldBuild?: IBuildInfov2
) => {
  if (newBuild.related && newBuild.related !== oldBuild?.related) {
    const builds = await getItems<IBuildInfov2>(COLLECTION);
    const newRelated = newBuild.related.filter((x) => !oldBuild.related?.includes(x)) ?? [];
    const oldRelated = oldBuild?.related.filter((x) => !newBuild.related?.includes(x)) ?? [];

    if (newRelated.length > 0) {
      for (const bId of newRelated) {
        const b = builds.find((x) => x._id.toString() === bId);
        if (b) {
          await updateItem(COLLECTION, { ...b, related: [...b.related, newBuild._id.toString()] });
        }
      }
    }
    if (oldRelated.length > 0) {
      for (const bId of oldRelated) {
        const b = builds.find((x) => x._id.toString() === bId);
        if (b) {
          await updateItem(COLLECTION, {
            ...b,
            related: [
              ...b.related.slice(0, b.related.indexOf(newBuild._id.toString())),
              ...b.related.slice(b.related.indexOf(newBuild._id.toString() + 1)),
            ],
          });
        }
      }
    }
  }
};
