import { IBuildInfov2 } from 'models/builds';
import { NextApiRequest, NextApiResponse } from 'next';
import { getIsHC } from 'utils/get-isHC';
import { getUserId } from 'utils/get-userId';
import {
  connectToDatabase,
  deleteItem,
  getItems,
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
        await insertItem(COLLECTION, newBuild, db);

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

        const updateResult = await updateItem(COLLECTION, updateBuild, db);

        if (updateResult) res.status(200).end();
        else res.status(500).send(`Failed to update id: ${req.body._id}`);

        break;
      case 'DELETE':
        const authorId = req.query['authorId'] as string;
        if (authorId !== userId && !isHC) {
          res.status(401).send('unauthorized');
          return;
        }
        await deleteItem(COLLECTION, req.query['id'] as string, db);
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
