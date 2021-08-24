import { IBuildInfov2 } from 'models/builds';
import { Db, Filter, ObjectId } from 'mongodb4';
import { NextApiRequest, NextApiResponse } from 'next';
import { getIsHC } from 'utils/get-isHC';
import { getUserId } from 'utils/get-userId';
import {
  connectToDatabase,
  deleteItem,
  getItems,
  getItemsByQuery,
  insertItem,
  updateItem,
} from 'utils/mongo';

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
        const buildQuery: Filter<IBuildInfov2> = {
          $or: [
            { variantOf: buildId },
            { related: { $in: [buildId] } },
            { variants: { $in: [buildId] } },
          ],
        };

        const builds = await getItemsByQuery<IBuildInfov2>(
          COLLECTION,
          db,
          buildQuery
        );

        await deleteItem(COLLECTION, req.query['id'] as string, db);
        for (const b of builds) {
          if (b.variantOf === buildId) {
            // clear variantOf
            await updateItem<IBuildInfov2>(
              COLLECTION,
              { ...b, variantOf: '' },
              db
            );
          }
          if (b.related.includes(buildId)) {
            // remove specific item from related
            const newRelated = [
              ...b.related.slice(0, b.related.indexOf(buildId)),
              ...b.related.slice(b.related.indexOf(buildId) + 1),
            ];
            await updateItem<IBuildInfov2>(
              COLLECTION,
              { ...b, related: newRelated },
              db
            );
          }
          if (b.variants.includes(buildId)) {
            // remove specific item from variants
            const newVariants = [
              ...b.variants.slice(0, b.variants.indexOf(buildId)),
              ...b.variants.slice(b.variants.indexOf(buildId) + 1),
            ];
            await updateItem<IBuildInfov2>(
              COLLECTION,
              { ...b, variants: newVariants },
              db
            );
          }
        }
        res.status(200).end();
        break;
      case 'GET':
      default:
        const result = await getItems<IBuildInfov2>(
          COLLECTION,
          db,
          'shipId',
          1
        );

        res.status(200).send(result);
        break;
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
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
  const builds = await getItems<IBuildInfov2>(COLLECTION, db);
  let newRelated: string[] = [];

  // set variant if variantOf
  if (newBuild.variantOf) {
    const parent = builds.find((x) => x._id.toString() === newBuild.variantOf);
    if (parent) {
      const variants = parent.variants;
      // add variant to parent and relate to other variants
      await updateItem(
        COLLECTION,
        { ...parent, variants: [...variants, newBuild._id.toString()] },
        db
      );
      for (const v of variants) {
        const b = builds.find(
          (x) =>
            x._id.toString() === v &&
            x.related.includes(newBuild._id.toString())
        );
        if (b) {
          await updateItem(
            COLLECTION,
            { ...b, related: [...b.related, newBuild._id.toString()] },
            db
          );
          if (!newBuild.related?.includes(v)) {
            newRelated = [...newRelated, v];
          }
        }
      }
    }
  } else if (newBuild.variantOf !== '' && oldBuild.variantOf === '') {
    // Remove if variantOf was blanked
    const parent = builds.find((x) => x._id.toString() === newBuild.variantOf);
    if (parent) {
      const variants = parent.variants;
      await updateItem(
        COLLECTION,
        {
          ...parent,
          variants: [
            ...variants.slice(0, variants.indexOf(newBuild._id.toString())),
            ...variants.slice(variants.indexOf(newBuild._id.toString()) + 1),
          ],
        },
        db
      );
      for (const v of variants) {
        const b = builds.find(
          (x) =>
            x._id.toString() === v &&
            x.related.includes(newBuild._id.toString())
        );
        if (b)
          await updateItem(
            COLLECTION,
            {
              ...b,
              related: [
                ...b.related.slice(
                  0,
                  b.related.indexOf(newBuild._id.toString())
                ),
                ...b.related.slice(
                  b.related.indexOf(newBuild._id.toString() + 1)
                ),
              ],
            },
            db
          );
      }
    }
  }

  if (newBuild.variants !== oldBuild?.variants) {
    const newVariants =
      newBuild.variants.filter((x) => !oldBuild.variants?.includes(x)) ?? [];
    const oldVariants =
      oldBuild?.variants.filter((x) => !newBuild.variants?.includes(x)) ?? [];

    if (newVariants.length > 0) {
      // TODO: add variantOf to the children.
      // TODO: make the children related to one another
    }
    if (oldVariants.length > 0) {
      // TODO: remove variantOf from the children.
    }
  }

  if (newBuild.related !== oldBuild?.related) {
    const newRelated =
      newBuild.related.filter((x) => !oldBuild.related?.includes(x)) ?? [];
    const oldRelated =
      oldBuild?.related.filter((x) => !newBuild.related?.includes(x)) ?? [];

    if (newRelated.length > 0) {
      // TODO: relate the new build to the builds
    }
    if (oldRelated.length > 0) {
      // TODO: unrelate the new build from these builds.
    }
  }
};
