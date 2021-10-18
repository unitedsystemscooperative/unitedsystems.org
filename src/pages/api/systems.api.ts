import { System } from 'models/about/system';
import { Db } from 'mongodb4';
import { NextApiRequest, NextApiResponse } from 'next';
import { getIsHC } from 'utils/get-isHC';
import { connectToDatabase, deleteItem, getItems, insertItem, updateItem } from 'utils/mongo';

const COLLECTION = 'systems';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await connectToDatabase();
    const isHC = await getIsHC(req, db);

    const system: System = req.body;

    switch (req.method) {
      case 'POST':
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }
        await insertItem(COLLECTION, system, db);

        res.status(200).end();
        break;
      case 'PUT':
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }

        const updateResult = await updateItem(COLLECTION, system, db);
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
        const result = await getSystems(db);

        res.status(200).send(result);
        break;
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
};

export const getSystems = async (db: Db) => {
  const items = await getItems<System>(COLLECTION, db, 'name', 1);
  return items.map((x) => {
    x._id = x._id.toString();
    return x;
  });
};
