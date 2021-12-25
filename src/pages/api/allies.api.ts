import { getIsHC } from '@/utils/get-isHC';
import { connectToDatabase, deleteItem, getItems, insertItem, updateItem } from '@/utils/mongo';
import { IAlly } from '~/about/models/ally';
import { Db } from 'mongodb4';
import { NextApiRequest, NextApiResponse } from 'next';

const COLLECTION = 'allies';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await connectToDatabase();
    const isHC = await getIsHC(req, db);

    const ally: IAlly = req.body;

    switch (req.method) {
      case 'POST':
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }

        await insertItem(COLLECTION, ally, db);

        res.status(200).end();

        break;
      case 'PUT':
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }

        const updateResult = await updateItem(COLLECTION, ally, db);
        if (updateResult) res.status(200).end();
        else res.status(500).send(`Failed to update id: ${req.body._id}`);

        break;
      case 'DELETE':
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }
        await deleteItem(COLLECTION, req.query['id'] as string, db);
        res.status(200).end();
        break;
      case 'GET':
      default:
        const result = await getAllies(db);

        res.status(200).send(result);
        break;
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export const getAllies = async (db: Db) => {
  const items = await getItems<IAlly>(COLLECTION, db, 'name', 1);
  return items.map((x) => {
    x._id = x._id.toString();
    return x;
  });
};
