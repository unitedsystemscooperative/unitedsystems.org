import { IBuildInfov2 } from '@/builds/_models';
import { auth } from 'auth';
import { connectToDatabase } from '@/lib/db';
import { getIsHC } from 'utils/auth-check';
import {
  deleteItem,
  getItems,
  getItemsByQuery,
  insertItem,
  updateItem,
  WithStringId,
} from 'utils/db';
import { getUserId } from 'utils/get-userId';
import { Filter } from 'mongodb';
import { NextRequest } from 'next/server';
import { generateGet } from '../_common/get';
import { getBuilds } from './getBuilds';

const COLLECTION = 'shipBuildsv2';

export const GET = generateGet(getBuilds);

export async function POST(request: Request) {
  const build: IBuildInfov2 = JSON.parse(await request.json());
  const userId = await getUserId(request);
  if (userId) {
    build.authorId = userId;
  }

  const insertedId = await insertItem(COLLECTION, build);
  await processOtherBuilds({ ...build, _id: insertedId });

  return new Response(null, { status: 200 });
}
export async function PUT(request: Request) {
  const updateBuild: IBuildInfov2 = JSON.parse(await request.json());
  const userId = await getUserId(request);
  const session = await auth();
  const isHC = await getIsHC(session);

  if (updateBuild.title) {
    const authorId = (updateBuild.authorId as string) ?? '';
    if (authorId !== userId && !isHC) {
      return new Response(null, { status: 403, statusText: 'forbidden' });
    }
  }

  const db = await connectToDatabase();

  const oldBuild = await db.collection<IBuildInfov2>(COLLECTION).findOne({ _id: updateBuild._id });

  const updateResult = await updateItem(COLLECTION, updateBuild);
  if (oldBuild) {
    await processOtherBuilds(updateBuild, oldBuild);
  }

  if (updateResult) {
    return new Response(null, { status: 200 });
  } else {
    return new Response(null, {
      status: 500,
      statusText: `Failed to update id: ${updateBuild._id}`,
    });
  }
}

export async function DELETE(request: NextRequest) {
  const userId = await getUserId(request);
  const session = await auth();
  const isHC = await getIsHC(session);

  const authorId = request.nextUrl.searchParams.get('authorId') ?? '';
  if (authorId !== userId && !isHC) {
    return new Response(null, { status: 403, statusText: 'forbidden' });
  }
  const buildId = request.nextUrl.searchParams.get('id');
  if (!buildId) {
    return new Response(null, { status: 400, statusText: `Id not provided` });
  }

  const buildQuery: Filter<IBuildInfov2> = { related: { $in: [buildId] } };

  const builds = await getItemsByQuery<IBuildInfov2>(COLLECTION, buildQuery);

  await deleteItem(COLLECTION, buildId);
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

  return new Response(null, { status: 200 });
}

/**
 * Verifies that other builds have the proper information such as VariantOf, Related, and Variant.
 * @param newBuild
 * @param db
 */
const processOtherBuilds = async (
  newBuild: IBuildInfov2 | WithStringId<Partial<IBuildInfov2>>,
  oldBuild?: IBuildInfov2
) => {
  if (newBuild.related && newBuild.related !== oldBuild?.related) {
    const builds = await getItems<IBuildInfov2>(COLLECTION);
    const newRelated = newBuild.related.filter((x) => !oldBuild?.related?.includes(x)) ?? [];
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
