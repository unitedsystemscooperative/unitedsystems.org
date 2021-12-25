import { getIsHC } from '@/utils/get-isHC';
import { getUserId } from '@/utils/get-userId';
import {
  connectToDatabase,
  deleteItem,
  getItems,
  getItemsByQuery,
  insertItem,
  updateItem,
} from '@/utils/mongo';
import { IBuildInfov2 } from '@@/builds/models';
import { Db, Filter, ObjectId } from 'mongodb4';
import { NextApiRequest, NextApiResponse } from 'next';

const COLLECTION = 'shipBuildsv2';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await connectToDatabase();
    const isHC = await getIsHC(req, db);
    const userId = await getUserId(req, db);

    const build: IBuildInfov2 = req.body;
    const updateBuild: Partial<IBuildInfov2> = req.body;

    switch (req.method) {
      case 'POST':
        const newBuild: IBuildInfov2 = { ...build };
        if (userId) {
          newBuild.authorId = userId;
        }
        const insertedId = await insertItem(COLLECTION, newBuild, db);
        await processOtherBuilds({ ...newBuild, _id: insertedId }, db);

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

        const oldBuild = await db
          .collection<IBuildInfov2>(COLLECTION)
          .findOne({ _id: new ObjectId(updateBuild._id) });

        const updateResult = await updateItem(COLLECTION, updateBuild, db);
        await processOtherBuilds(updateBuild, db, oldBuild);

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

        const builds = await getItemsByQuery<IBuildInfov2>(COLLECTION, db, buildQuery);

        await deleteItem(COLLECTION, req.query['id'] as string, db);
        for (const b of builds) {
          if (b.related.includes(buildId)) {
            // remove specific item from related
            const newRelated = [
              ...b.related.slice(0, b.related.indexOf(buildId)),
              ...b.related.slice(b.related.indexOf(buildId) + 1),
            ];
            await updateItem<IBuildInfov2>(COLLECTION, { ...b, related: newRelated }, db);
          }
        }
        res.status(200).end();
        break;
      case 'GET':
      default:
        const result = await getBuilds(db);

        res.status(200).send(result);
        break;
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
};

export const getBuilds = async (db: Db) => {
  const items = await getItems<IBuildInfov2>(COLLECTION, db, 'shipId', 1);
  return items.map((x) => {
    x._id = x._id.toString();
    return x;
  });
};

/**
 * Verifies that other builds have the proper information such as VariantOf, Related, and Variant.
 * @param newBuild
 * @param db
 */
const processOtherBuilds = async (
  newBuild: IBuildInfov2 | Partial<IBuildInfov2>,
  db: Db,
  oldBuild?: IBuildInfov2
) => {
  if (newBuild.related && newBuild.related !== oldBuild?.related) {
    const builds = await getItems<IBuildInfov2>(COLLECTION, db);
    const newRelated = newBuild.related.filter((x) => !oldBuild.related?.includes(x)) ?? [];
    const oldRelated = oldBuild?.related.filter((x) => !newBuild.related?.includes(x)) ?? [];

    if (newRelated.length > 0) {
      for (const bId of newRelated) {
        const b = builds.find((x) => x._id.toString() === bId);
        if (b) {
          await updateItem(
            COLLECTION,
            { ...b, related: [...b.related, newBuild._id.toString()] },
            db
          );
        }
      }
    }
    if (oldRelated.length > 0) {
      for (const bId of oldRelated) {
        const b = builds.find((x) => x._id.toString() === bId);
        if (b) {
          await updateItem(
            COLLECTION,
            {
              ...b,
              related: [
                ...b.related.slice(0, b.related.indexOf(newBuild._id.toString())),
                ...b.related.slice(b.related.indexOf(newBuild._id.toString() + 1)),
              ],
            },
            db
          );
        }
      }
    }
  }
};
