import { deleteItem, getItems, insertItem, updateItem } from '@/utils/db';
import { getIsHC } from '@/utils/get-isHC';
import { System } from '@/app/about/_models/system';
import { NextApiRequest, NextApiResponse } from 'next';

const COLLECTION = 'systems';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const isHC = await getIsHC(req);

    const system: System = req.body;

    switch (req.method) {
      case 'POST':
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }
        await insertItem(COLLECTION, system);

        res.status(200).end();
        break;
      case 'PUT':
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }

        const updateResult = await updateItem(COLLECTION, system);
        if (updateResult) res.status(200).end();
        else res.status(500).send(`Failed to update id: ${req.body._id}`);

        break;
      case 'DELETE':
        if (!isHC) {
          res.status(401).send('unauthorized');
          return;
        }

        await deleteItem(COLLECTION, req.query['id'] as string);

        res.status(200).end();
        break;
      case 'GET':
      default:
        const result = await getSystems();

        res.status(200).send(result);
        break;
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
};

export const getSystems = async () => {
  const items = await getItems<System>(COLLECTION, 'name', 1);
  return items;
};
