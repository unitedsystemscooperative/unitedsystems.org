import { getIsHC } from '@/utils/get-isHC';
import { connectToDatabase, deleteItem, getItems, insertItem, updateItem } from '@/utils/mongo';
import { IFleetCarrier } from '~/about/models/fleetCarrier';
import { Db } from 'mongodb4';
import { NextApiRequest, NextApiResponse } from 'next';

const COLLECTION = 'fleetCarriers';
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await connectToDatabase();
    const isHC = await getIsHC(req, db);

    const carrier: IFleetCarrier = req.body;

    switch (req.method) {
      case 'POST':
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }

        await insertItem(COLLECTION, carrier, db);

        res.status(200).end();
        break;
      case 'PUT':
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }

        const updateResult = await updateItem(COLLECTION, carrier, db);

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
        const results = await getFCs(db);

        res.status(200).send(results);
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export const getFCs = async (db: Db) => {
  const items = await getItems<IFleetCarrier>(COLLECTION, db, 'name', 1);
  return items.map((x) => {
    x._id = x._id.toString();
    return x;
  });
};
